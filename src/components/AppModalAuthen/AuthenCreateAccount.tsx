import {useTheme} from '@shopify/restyle';
import React, {
  Ref,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {AppIcon, AppText, AppTouchableOpacity, AppView} from '@/components';
import {Icons, Theme} from '@/themes';
import AuthenLoginSocial from './AuthenLoginSocial';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

type TProps = {};
function AuthenCreateAccount({}: TProps, ref: Ref<TModalRef>) {
  const {t} = useTranslation();
  const {colors} = useTheme<Theme>();
  const [isVisiable, setIsVisiable] = useState(false);
  useImperativeHandle(ref, () => ({
    onClose,
    onShow,
  }));
  const onClose = useCallback(() => {
    setIsVisiable(false);
  }, []);
  const onShow = useCallback(() => {
    setIsVisiable(true);
  }, []);
  return (
    <Modal
      isVisible={isVisiable}
      avoidKeyboard
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      style={[styles.container]}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      animationInTiming={500}
      animationOutTiming={400}>
      <AppView
        flexDirection="row"
        alignItems="center"
        paddingTop="base"
        marginBottom="md">
        <AppView flex={1} alignItems="center">
          <AppText variant="baseSemiBold">
            {t('Create an account to continue')}
          </AppText>
        </AppView>
        <AppTouchableOpacity onPress={onClose}>
          <AppIcon name={Icons.Close} color={colors.black} />
        </AppTouchableOpacity>
      </AppView>
      <AppTouchableOpacity
        backgroundColor="neutralGrey9"
        borderRadius="xs"
        paddingVertical="xxs">
        <AppText color="white" textAlign="center">
          {t('Create Account')}
        </AppText>
      </AppTouchableOpacity>
      <AuthenLoginSocial />
      <AppView
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        marginVertical="md">
        <AppText variant="span" color="neutralGrey6">
          {t('Already have account?')}
        </AppText>
        <AppTouchableOpacity>
          <AppText variant="span" marginLeft="tiny">
            {t('Log In')}
          </AppText>
        </AppTouchableOpacity>
      </AppView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: 'flex-end',
  },
});
export default forwardRef(AuthenCreateAccount);
