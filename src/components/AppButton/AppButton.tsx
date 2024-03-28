import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {createBox} from '@shopify/restyle';
import {Theme} from '@/themes';
const Button = createBox<Theme, TouchableOpacityProps>(TouchableOpacity);
type ButtonProps = React.ComponentProps<typeof Button> & {
  ref?: React.RefObject<TouchableOpacity>;
  children?: React.ReactNode;
};

const AppButton = ({children, ...props}: ButtonProps) => {
  return (
    <Button activeOpacity={0.8} {...props}>
      {children}
    </Button>
  );
};
export default AppButton;
