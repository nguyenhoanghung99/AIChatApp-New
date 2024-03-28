import React, { MutableRefObject, useRef, useState } from 'react';
import { AppIcon, AppSafeAreaView, AppText, AppView } from '@/components';
import AppButton from '@/components/AppButton/AppButton';
import {
  DateTimePicker,
  DateTimeRef,
  Radio,
  AppTextInput,
} from '../../components';
import { GENDER } from '../const';
import { Icons, fonts } from '@/themes';
import { useTranslation } from 'react-i18next';
import { Image, PermissionsAndroid, Platform, ScrollView } from 'react-native';
import ImageCropPicker, { Image as TImage } from 'react-native-image-crop-picker';
import { AppScrollView } from '@/components';
import { goBack } from '@/navigator';
import { useMutationAuthen, usePermission } from '@/hooks';
import { useAuthStore } from '@/stores';

const EditProfile = () => {
  const { t } = useTranslation();
  // const {showMessagePermission} = usePermission();
  const { onUpdateProfileUser, mutationLogout } = useMutationAuthen();
  const { userInfo } = useAuthStore(state => state);
  const refDateTime = useRef<DateTimeRef | string>(userInfo.birthday);
  const [gender, setGender] = useState(userInfo.gender);
  const [avatar, setAvatar] = useState({
    uri: '',
    mime: '',
    name: ''
  });
  const refValue = useRef({
    fullName: userInfo.fullName,
    bio: userInfo.yourStatus,
  });
  const handleUpdateProfile = () => {
    const formData = new FormData();
    if(avatar)
    {
      formData.append('avatar', {
        uri: avatar.uri,
        name: avatar.name,
        type: avatar.mime,
      });
    }
    formData.append('bio', refValue.current.bio);
    formData.append('birthday', refDateTime?.current?.getValue?.() + '');
    formData.append('fullName', refValue.current.fullName);
    formData.append('gender', gender);
    formData.append('searchable', false);
    console.log(JSON.stringify(formData));
    onUpdateProfileUser(formData);
  };

  const _handleChooseImage = async () => {
    await ImageCropPicker.openPicker({
      includeExif: true,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
      forceJpg: true,
    })
      .then(image => {
        console.log('image', image)
        const fileName = image?.path.split('/').pop();
        setAvatar({
          uri: image.path,
          mime: image.mime,
          name: fileName ?? '',
        });
      })
      .catch(err => {
        if (err.code === 'E_NO_LIBRARY_PERMISSION') {
          console.log('Show Request Permission');
          // showMessagePermission();
        }
      });
  };

  return (
    <AppSafeAreaView backgroundColor="colorF5" flex={1}>
      <AppView
        flexDirection="row"
        padding="base"
        justifyContent={'space-between'}
        backgroundColor={'bgBlack'}>
        <AppButton onPress={() => goBack()}>
          <AppText variant={'headingR3'} color={'lightLink'}>
            {t('Cancel')}
          </AppText>
        </AppButton>
        <AppButton onPress={handleUpdateProfile}>
          <AppText variant="heading3" color="lightLink">
            {t('Done')}
          </AppText>
        </AppButton>
      </AppView>
      <AppButton
        backgroundColor={'bgBlack'}
        paddingBottom={'xxs'}
        onPress={_handleChooseImage}>
        <AppView
          width={80}
          height={80}
          borderRadius={'massive'}
          backgroundColor={'black'}
          alignSelf="center">
          <Image
            source={{
              uri: avatar?.uri.length ? avatar?.uri : userInfo.avatar || 'https://friendify-bucket.s3.ap-southeast-1.amazonaws.com/files/1.png',
            }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
              borderRadius: 80,
            }}
          />
          <AppView
            justifyContent="center"
            alignItems="center"
            width={24}
            height={24}
            borderRadius={'base'}
            bg={'colorF0'}
            position={'absolute'}
            right={0}
            bottom={0}>
            <AppIcon name={Icons.Camera} size={16} />
          </AppView>
        </AppView>
      </AppButton>
      <AppScrollView>
        <AppView paddingHorizontal={'base'} gap={'xl'} paddingVertical="xxs">
          <AppTextInput
            title="Name"
            defaultValue={refValue?.current?.fullName}
            onChangeText={e => (refValue.current.fullName = e)}
          />
          <AppView gap={'xs'}>
            <AppText color={'color72'} variant="heading3">
              {t('Gender')}
            </AppText>
            <AppView
              gap={'base'}
              flexDirection="row"
              justifyContent={'space-between'}>
              {GENDER.map((item, index) => {
                return (
                  <Radio
                    key={`GENDER${index}`}
                    title={item.name}
                    value={item.value == gender}
                    onPress={() => setGender(item.value)}
                  />
                );
              })}
            </AppView>
          </AppView>
          <DateTimePicker
            ref={refDateTime}
            date={new Date()}
            title={t('Date of Birth')}
          />
          <AppTextInput
            title="Bio"
            multiline
            placeholder="Any details such as age, occupation, or city..."
            defaultValue={refValue?.current?.bio}
            onChangeText={e => (refValue.current.bio = e)}
          />
          <AppButton
            onPress={() => mutationLogout()}
            marginTop={'xl'}
            height={48}
            bg="white"
            justifyContent="center"
            alignItems="center"
            borderRadius={'base'}>
            <AppText variant="sMedium" color={'red'}>
              {t('Log Out')}
            </AppText>
          </AppButton>
        </AppView>
      </AppScrollView>
    </AppSafeAreaView>
  );
};

export default EditProfile;
