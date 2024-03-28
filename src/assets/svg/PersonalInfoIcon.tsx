import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
const SVGComponent = (props: any) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={32} height={32} rx={8} fill="#007AFF" />
    <Path
      d="M16 18V26H8C8 23.8783 8.84285 21.8434 10.3431 20.3431C11.8434 18.8429 13.8783 18 16 18ZM22 25.5L19.061 27.045L19.622 23.773L17.245 21.455L20.531 20.977L22 18L23.47 20.977L26.755 21.455L24.378 23.773L24.938 27.045L22 25.5ZM16 17C12.685 17 10 14.315 10 11C10 7.685 12.685 5 16 5C19.315 5 22 7.685 22 11C22 14.315 19.315 17 16 17Z"
      fill="white"
    />
  </Svg>
);
export default SVGComponent;
