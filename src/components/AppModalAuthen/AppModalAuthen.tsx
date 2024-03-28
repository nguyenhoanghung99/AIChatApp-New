import { AppBottomSheetCommon } from '@/components';
import React, {
  Ref,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AuthenLogin from './AuthenLogin';
import AuthenRegister from './AuthenRegister';
import AuthenForgotPassword from './AuthenForgotPassword';
import AuthenVerifyOtp from './AuthenVerifyOtp';
import { isIOS, responsiveHeight, width } from '@/themes';
type TProps = {};

function AppModalAuthen({ }: TProps, ref: Ref<TModalRef>) {
  const scrollViewRef = useRef<ScrollView>(null);
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const [isHidden, setIsHidden] = useState('register');
  const { top } = useSafeAreaInsets();
  useImperativeHandle(ref, () => ({
    onClose,
    onShow,
  }));
  const onClose = useCallback(() => {
    bottomSheetRef.current?.onCloseBotSheet()
  }, []);
  const onShow = useCallback(() => {
    bottomSheetRef.current?.onOpenBotSheet()
  }, []);
  return (
    <AppBottomSheetCommon 
      ref={bottomSheetRef}
      snapPoints={['100%']}
      enablePanDownToClose={false}
    >
      <ScrollView
        style={{paddingTop: isIOS ? top - responsiveHeight(20) : 0}}
        scrollEnabled={false}
        ref={scrollViewRef}
        horizontal
        bounces={false}
        pagingEnabled
        scrollEventThrottle={16}>
        <AuthenLogin
          onClose={onClose}
          onNext={() => {
            setIsHidden('register');
            scrollViewRef.current?.scrollTo({
              x: width,
              animated: true,
            });
          }}
          onForgot={() => {
            setIsHidden('');
            scrollViewRef.current?.scrollTo({
              x: width,
              animated: true,
            });
          }}
        />
        {isHidden === 'register' ? (
          <AuthenRegister
            onPrev={() => {
              scrollViewRef.current?.scrollTo({
                x: 0,
                animated: true,
              });
            }}
            onNext={() => {
              scrollViewRef.current?.scrollTo({
                x: width * 2,
                animated: true,
              });
            }}
          />
        ) : (
          <>
            <AuthenForgotPassword
              onPrev={() => {
                scrollViewRef.current?.scrollTo({
                  x: 0,
                  animated: true,
                });
              }}
              onNext={() => {
                scrollViewRef.current?.scrollTo({
                  x: width * 2,
                  animated: true,
                });
              }}
            />
            <AuthenVerifyOtp
              onPrev={() => {
                scrollViewRef.current?.scrollTo({
                  x: width,
                  animated: true,
                });
              }}
              onNext={() => {
                scrollViewRef.current?.scrollTo({
                  x: width * 3,
                  animated: true,
                });
              }}
            />
          </>
        )}
      </ScrollView>
    </AppBottomSheetCommon>
  );
}
export default forwardRef(AppModalAuthen);
