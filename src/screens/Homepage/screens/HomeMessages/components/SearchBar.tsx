import {AppIcon, AppText, AppTouchableOpacity, AppView} from '@/components';
import {Routes, navigate} from '@/navigator';
import {BaseStyles, FontSizes, Icons, Theme, isIOS, metrics} from '@/themes';
import {useTheme} from '@shopify/restyle';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  InteractionManager,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

export type SearchBarProps = {
  value: string;
  setValue: (value: string) => void;
  autoFocus?: boolean;
  onCancel?: () => void;
  isShow?: boolean;
  showCancel?: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  setValue,
  autoFocus,
  onCancel,
  isShow = true,
  showCancel = true,
}) => {
  const {t} = useTranslation();
  const [searchTemp, setSearchTemp] = useState('');
  const [showInput, setShowInput] = useState<boolean>(false);
  const {colors} = useTheme<Theme>();
  const inputRef = useRef<TextInput>(null);

  const animationRef = useRef<any>();

  useEffect(() => {
    setTimeout(
      () => {
        if (isShow) {
          animationRef.current?.slideInDown?.(isIOS ? 100 : 200);
          setShowInput(true);
        } else {
          animationRef.current?.slideOutUp?.(isIOS ? 100 : 200);
        }
      },
      isIOS ? 100 : 200,
    );
  }, [isShow]);

  return (
    <Animatable.View duration={isIOS ? 100 : 300} ref={animationRef}>
      {showInput ? (
        <AppView
          flexDirection="row"
          alignItems="center"
          paddingBottom="tiny"
          paddingTop="tiny"
          backgroundColor="white">
          <AppView
            flex={1}
            flexDirection="row"
            alignItems="center"
            backgroundColor="neutralGrey5"
            paddingHorizontal="tiny"
            paddingVertical={isIOS ? 'xxs' : 'reset'}
            marginRight="xs"
            borderRadius="sm">
            <AppTouchableOpacity onPress={() => inputRef.current?.focus()}>
              <AppIcon
                name={Icons.Search}
                size={FontSizes.large}
                color={colors.neutralGrey7}
              />
            </AppTouchableOpacity>
            <TextInput
              autoFocus
              ref={inputRef}
              style={[BaseStyles.flex1, {paddingHorizontal: metrics.xxs}]}
              placeholder={t('Search by ID, name') as string}
            />
            <AppTouchableOpacity onPress={() => navigate(Routes.QrCodeScan)}>
              <AppIcon
                color={colors.black}
                name={Icons.Scan}
                size={FontSizes.large}
              />
            </AppTouchableOpacity>
          </AppView>

          {showCancel ? (
            <AppView ml="tiny">
              <TouchableOpacity
                onPress={async () => {
                  await animationRef.current?.zoomOutLeft?.();
                  onCancel?.();
                  Keyboard.dismiss();
                  setSearchTemp('');
                }}>
                <AppText color="lightLink" variant="spanSemibold">
                  {t('Cancel')}
                </AppText>
              </TouchableOpacity>
            </AppView>
          ) : null}
        </AppView>
      ) : null}
    </Animatable.View>
  );
};

export default SearchBar;
