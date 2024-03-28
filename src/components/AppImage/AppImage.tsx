import React from 'react';
import {createBox} from '@shopify/restyle';
import {Theme} from '@/themes';
import FastImage, {
  FastImageProps as NativeFastImage,
  Source,
} from 'react-native-fast-image';
const FastImageComponent = createBox<Theme, NativeFastImage>(FastImage);

type FastImageProps = React.ComponentProps<typeof FastImageComponent> & {
  source?: number | Source | undefined;
};

const AppFastImage = ({source, ...props}: FastImageProps) => {
  return <FastImage source={source} {...props} />;
};
export default AppFastImage;
