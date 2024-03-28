import React from 'react';
import AppTextInput, {TextInputProps} from './AppTextInput';
import {AppText, AppView} from '..';
import {colors} from '@/themes';
import AppButton from '../AppButton/AppButton';
import EyeOnIcon from '@/assets/svg/EyeOnIcon';
import EyeOffIcon from '@/assets/svg/EyeOffIcon';

interface TAppTextInputWithTitle extends TextInputProps {
  title?: string;
  placeholder?: string;
  value?: string;
  isDark?: boolean;
  isSecureTextEntry?: boolean;
  isPasswordInput?: boolean;
  onChangeText?: ((text: string) => void) | undefined;
  onTogglePassword?: (() => void) | undefined;
}

const AppTextInputNormal = ({
  isDark,
  title,
  placeholder,
  value,
  isSecureTextEntry = false,
  isPasswordInput = false,
  onChangeText,
  onTogglePassword,
  ...rest
}: TAppTextInputWithTitle) => {
  return (
    <AppView gap="tiny">
      {title && (
        <AppText color="black" fontWeight="700">
          {title}
        </AppText>
      )}
      {isPasswordInput ? (
        <AppView flexDirection="row" alignItems="center">
          <AppTextInput
            width={'85%'}
            height={50}
            secureTextEntry={isSecureTextEntry}
            borderTopLeftRadius="sm"
            borderBottomLeftRadius="sm"
            padding="xs"
            cursorColor={isDark ? colors.dark.black : colors.light.black}
            backgroundColor="white"
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            {...rest}
          />
          <AppButton
            onPress={onTogglePassword}
            width={'15%'}
            height={50}
            padding="xs"
            borderTopRightRadius="sm"
            borderBottomRightRadius="sm"
            backgroundColor="white"
            borderWidth={0}>
            {isSecureTextEntry ? <EyeOnIcon /> : <EyeOffIcon />}
          </AppButton>
        </AppView>
      ) : (
        <AppTextInput
          width={'100%'}
          height={50}
          secureTextEntry={isSecureTextEntry}
          borderRadius="sm"
          padding="xs"
          cursorColor={isDark ? colors.dark.black : colors.light.black}
          backgroundColor="white"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          {...rest}
        />
      )}
    </AppView>
  );
};

export default AppTextInputNormal;
