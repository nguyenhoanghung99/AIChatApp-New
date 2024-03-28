import React from 'react';
import {
  TouchableOpacity as NativeTouchableOpacity,
  TouchableHighlightProps as NativeTouchableHighlightProps,
} from 'react-native';
import {createBox} from '@shopify/restyle';
import {Theme, hitSlop} from '@/themes';
const TouchableOpacity = createBox<Theme, NativeTouchableHighlightProps>(
  NativeTouchableOpacity,
);

type TouchableOpacityProps = React.ComponentProps<typeof TouchableOpacity> & {
  children: React.ReactNode;
};

const AppTouchableOpacity = ({children, ...props}: TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...props} hitSlop={hitSlop} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  );
};
export default AppTouchableOpacity;
