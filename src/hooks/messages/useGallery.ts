import { isIOS } from '@/themes';
import { CameraRoll, PhotoIdentifier, cameraRollEventEmitter, iosRefreshGallerySelection } from '@react-native-camera-roll/camera-roll';

import { useCallback, useEffect, useState } from 'react';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import { AppState, EmitterSubscription, Platform } from 'react-native';
import Permissions, { PERMISSIONS } from 'react-native-permissions';

interface GalleryOptions {
    pageSize: number;
    mimeTypeFilter?: Array<string>;
}
export interface ImageDTO {
    filename: string;
    fileSize: number;
    uri: string;
    type: string;
}
interface GalleryLogic {
    photos: ImageDTO[];
    loadNextPagePictures: () => void;
    isLoading: boolean;
    isLoadingNextPage: boolean;
    isReloading: boolean;
    hasNextPage: boolean;
    checkPermission: () => void
    dataProvider: DataProvider
}

const supportedMimeTypesByTheBackEnd = [
    'image/jpeg',
    'image/png',
    'image/heif',
    'image/heic',
    'image/heif-sequence',
    'image/heic-sequence',
];
export const EXTENTION_VIDEO = 'MP4,MOV,AVI,WMV,AVCHD,WEBM,FLV';
const convertCameraRollPicturesToImageDtoType = (edges: PhotoIdentifier[]) => {
    if (edges?.length) {
        const result = edges.flatMap((el) => {
            return {
                filename: el.node.image.filename ?? '',
                fileSize: el.node.image.fileSize ?? 0,
                uri: el.node.image.uri,
                type: el.node.type,
            }
        });
        return result;
    }
    return [];
}
export const useGallery = ({
    pageSize = 30,
    mimeTypeFilter = supportedMimeTypesByTheBackEnd,
}: GalleryOptions): GalleryLogic => {
    const [isLoading, setIsLoading] = useState(false);
    const [isReloading, setIsReloading] = useState(false);
    const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [nextCursor, setNextCursor] = useState<string>();
    const [photos, setPhotos] = useState<ImageDTO[]>([]);
    const [dataProvider, setDataProvider] = useState<any>(new DataProvider((r1, r2) => {
        return r1 !== r2;
    }));
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const loadNextPagePictures = useCallback(async () => {
        try {
            nextCursor ? setIsLoadingNextPage(true) : setIsLoading(true);
            const { edges, page_info } = await CameraRoll.getPhotos({
                first: pageSize,
                after: nextCursor,
                assetType: 'Photos',
                mimeTypes: mimeTypeFilter,
                ...(!isIOS && { include: ['fileSize', 'filename'] }),
            });
            const newPhotos = convertCameraRollPicturesToImageDtoType(edges);
            setDataProvider((prev: DataProvider) => prev.cloneWithRows(newPhotos))
            setPhotos(prev => [...prev, ...newPhotos])
            setNextCursor(page_info.end_cursor);
            setHasNextPage(page_info.has_next_page);
        } catch (error) {
            console.error('useGallery getPhotos error:', error);
        } finally {
            setIsLoading(false);
            setIsLoadingNextPage(false);
        }
    }, [mimeTypeFilter, nextCursor, pageSize]);

    const getUnloadedPictures = useCallback(async () => {
        try {
            setIsReloading(true);
            const { edges, page_info } = await CameraRoll.getPhotos({
                first: !photos || photos.length < pageSize ? pageSize : photos.length,
                assetType: 'Photos',
                mimeTypes: mimeTypeFilter,
                // Include fileSize only for android since it's causing performance issues on IOS.
                ...(!isIOS && { include: ['fileSize', 'filename'] }),
            });
            const newPhotos = convertCameraRollPicturesToImageDtoType(edges);
            setPhotos(newPhotos);

            setNextCursor(page_info.end_cursor);
            setHasNextPage(page_info.has_next_page);
        } catch (error) {
            console.error('useGallery getNewPhotos error:', error);
        } finally {
            setIsReloading(false);
        }
    }, [mimeTypeFilter, pageSize, photos]);

    useEffect(() => {
        if (photos.length === 0) {
            loadNextPagePictures()
        }
    }, [photos, loadNextPagePictures]);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', async (nextAppState) => {
            if (nextAppState === 'active') {
                getUnloadedPictures();
            }
        });

        return () => {
            subscription.remove();
        };
    }, [getUnloadedPictures]);

    useEffect(() => {
        let subscription: EmitterSubscription;
        if (isIOS) {
            subscription = cameraRollEventEmitter.addListener('onLibrarySelectionChange', (_event) => {
                getUnloadedPictures();
            });
        }

        return () => {
            if (isIOS && subscription) {
                subscription.remove();
            }
        };
    }, [getUnloadedPictures]);
    const checkAndroidPermissions = useCallback(async () => {
        if (parseInt(Platform.Version as string, 10) >= 33) {
            const permissions = await Permissions.checkMultiple([
                PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
                PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
            ]);
            if (
                permissions[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
                Permissions.RESULTS.GRANTED &&
                permissions[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
                Permissions.RESULTS.GRANTED
            ) {
                setHasPermission(true);
                return;
            }
            const res = await Permissions.requestMultiple([
                PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
                PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
            ]);
            if (
                res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
                Permissions.RESULTS.GRANTED &&
                res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
                Permissions.RESULTS.GRANTED
            ) {
                setHasPermission(true);
            }
            if (
                res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
                Permissions.RESULTS.DENIED ||
                res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === Permissions.RESULTS.DENIED
            ) {
                checkAndroidPermissions();
            }
            if (
                res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
                Permissions.RESULTS.BLOCKED ||
                res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
                Permissions.RESULTS.BLOCKED
            ) {
                setHasPermission(false);
            }
        } else {
            const permission = await Permissions.check(
                PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            );
            if (permission === Permissions.RESULTS.GRANTED) {
                setHasPermission(true);
                return;
            }
            const res = await Permissions.request(
                PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            );
            if (res === Permissions.RESULTS.GRANTED) {
                setHasPermission(true);
            }
            if (res === Permissions.RESULTS.DENIED) {
                checkAndroidPermissions();
            }
            if (res === Permissions.RESULTS.BLOCKED) {
                setHasPermission(false);
            }
        }
    }, []);

    const checkPermission = useCallback(async () => {
        if (Platform.OS === 'ios') {
            const permission = await Permissions.check(PERMISSIONS.IOS.PHOTO_LIBRARY);
            if (
                permission === Permissions.RESULTS.GRANTED ||
                permission === Permissions.RESULTS.LIMITED
            ) {
                setHasPermission(true);
                return;
            }
            const res = await Permissions.request(PERMISSIONS.IOS.PHOTO_LIBRARY);
            if (
                res === Permissions.RESULTS.GRANTED ||
                res === Permissions.RESULTS.LIMITED
            ) {
                setHasPermission(true);
            }
            if (res === Permissions.RESULTS.BLOCKED) {
                setHasPermission(false);
            }
        } else if (Platform.OS === 'android') {
            checkAndroidPermissions();
        }
    }, [checkAndroidPermissions]);
    console.log('dataProvider', dataProvider)
    return {
        photos,
        loadNextPagePictures,
        isLoading,
        isLoadingNextPage,
        isReloading,
        hasNextPage,
        checkPermission,
        dataProvider
    };
};