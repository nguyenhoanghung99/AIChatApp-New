import React from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@shopify/restyle';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {AppIcon, AppText, AppTouchableOpacity, AppView} from '@/components';
import {Icons, Theme, responsiveHeight, responsiveWidth} from '@/themes';

type TProps = {
  error?: string;
  isRequired?: boolean;
  label?: string;
  isPassword?: boolean;
  onRightIconPress?: () => void;
  rightIcon?: React.ReactElement;
} & TextInputProps;

export default function AppInput({
  error,
  onChangeText,
  onBlur,
  isRequired,
  label,
  isPassword,
  onRightIconPress,
  rightIcon,
  placeholder,
  ...props
}: TProps) {
  const {t} = useTranslation();
  const {colors} = useTheme<Theme>();
  const [showPass, setShowpass] = React.useState(isPassword);
  const renderRightIcon = () => {
    if (isPassword) {
      if (showPass) {
        return Icons.EyeOff;
      }
      return Icons.EyeOn;
    } else {
      return rightIcon;
    }
  };
  const onPressTooglePass = () => {
    if (!isPassword) {
      if (onRightIconPress) {
        onRightIconPress();
      }
    } else {
      setShowpass(!showPass);
    }
  };
  return (
    <AppView marginBottom="xs">
      {label && (
        <AppText variant="span" marginBottom="xxs" color='neutralGrey9'>
          {t(label)} {isRequired && '*'}
        </AppText>
      )}

      <AppView
        flexDirection="row"
        alignItems="center"
        backgroundColor="white"
        borderRadius="sm">
        <TextInput
          placeholder={t(placeholder || '') as string}
          onChangeText={onChangeText}
          onBlur={onBlur}
          style={[styles.input, {color: colors.neutralGrey9}]}
          secureTextEntry={showPass}
          placeholderTextColor={colors.colorBF}
          {...props}
        />
        {isPassword ? (
          <AppTouchableOpacity onPress={onPressTooglePass} marginRight="base">
            <AppIcon
              name={renderRightIcon() as string}
              color={colors.colorBF}
              size={18}
            />
          </AppTouchableOpacity>
        ) : null}
      </AppView>
      {error && (
        <AppText variant="span" marginTop="tiny" color="danger">
          {error}
        </AppText>
      )}
    </AppView>
  );
}
const styles = StyleSheet.create({
  input: {
    paddingHorizontal: responsiveWidth(16),
    paddingVertical: responsiveHeight(12),
    flexGrow: 1,
  },
});
