import {useModalStore} from '@/stores';
import {SMS_MESS, handleDownload} from '@/utilities';
import {useCallback} from 'react';
import Share from 'react-native-share';
import {captureRef} from 'react-native-view-shot';

const useActionsQrCode = () => {
  const {setIsShowGoSetting} = useModalStore();
  const saveImage = useCallback((refViewShot: any) => {
    refViewShot.current &&
      captureRef(refViewShot, {
        fileName: 'friendify-qrcode',
        format: 'png',
      }).then(uri => {
        handleDownload(
          uri,
          () => {
            console.log('Show modal option setting');
            setIsShowGoSetting();
          },
          true,
        );
      });
  }, []);

  const handleShare = useCallback(
    (
      prevRef: {
        isShare: boolean;
      },
      refViewShot: any,
    ) => {
      if (!prevRef.isShare) {
        prevRef.isShare = true;
        try {
          refViewShot?.current?.capture().then(async (uri: string) => {
            const shareOptions = {
              failOnCancel: false,
              message: SMS_MESS,
              url: uri,
            };
            await Share.open(shareOptions)
              .then(() => (prevRef.isShare = false))
              .catch(() => (prevRef.isShare = false));
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
    [],
  );

  const regenerateQr = useCallback(() => {}, []);

  return {
    saveImage,
    handleShare,
    regenerateQr,
  };
};

export default useActionsQrCode;
