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
    <Rect width={32} height={32} rx={8} fill="#34C759" />
    <Path
      d="M18 18.252V26H8C7.99969 24.7789 8.27892 23.5739 8.8163 22.4774C9.35368 21.3809 10.1349 20.4219 11.1002 19.674C12.0655 18.9261 13.1892 18.4091 14.3852 18.1626C15.5811 17.9162 16.8177 17.9467 18 18.252ZM16 17C12.685 17 10 14.315 10 11C10 7.685 12.685 5 16 5C19.315 5 22 7.685 22 11C22 14.315 19.315 17 16 17ZM22 21V17.5L27 22L22 26.5V23H19V21H22Z"
      fill="white"
    />
  </Svg>
);
export default SVGComponent;
