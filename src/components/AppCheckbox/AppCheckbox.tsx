import React, {useCallback, useRef, useState, useEffect} from 'react';
import {AppIcon, AppPressable, AppText, AppView} from '@/components';
import {useTheme} from '@shopify/restyle';
import {
  FontSizes,
  Icons,
  Theme,
  responsiveHeight,
  responsiveWidth,
} from '@/themes';
import {Animated} from 'react-native';

type TProps = {
  label?: string;
  onChange: (selected?: boolean) => void;
  value?: boolean;
};
export default function AppCheckbox({label, onChange, value}: TProps) {
  const [isActive, setIsActive] = useState(value);
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const {colors} = useTheme<Theme>();
  const onChangeCheckbox = useCallback(() => {
    setIsActive(prev => !prev);
    onChange(!isActive);
    const toValue = isActive ? 1 : 0;
    Animated.timing(animatedOpacity, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [animatedOpacity, isActive, onChange]);

  useEffect(() => {
    setIsActive(value);
    const toValue = value ? 1 : 0;
    Animated.timing(animatedOpacity, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [value, animatedOpacity]);

  return (
    <AppPressable
      flexDirection="row"
      alignItems="center"
      flex={1}
      onPress={onChangeCheckbox}>
      <AppView
        height={responsiveHeight(24)}
        width={responsiveWidth(24)}
        borderColor={isActive ? 'lightLink' : 'neutralGrey7'}
        borderRadius="xs"
        borderWidth={2}
        marginTop="tiny"
        marginRight={label ? 'xs' : 'reset'}
        backgroundColor={isActive ? 'lightLink' : 'transparent'}
        alignItems="center"
        justifyContent="center">
        <Animated.View style={{opacity: animatedOpacity}}>
          <AppIcon
            name={Icons.Check}
            size={FontSizes.body}
            color={colors.white}
          />
        </Animated.View>
      </AppView>
      {label && (
        <AppView flexGrow={1}>
          <AppText variant="span" color='neutralGrey9'>{label}</AppText>
        </AppView>
      )}
    </AppPressable>
  );
}
