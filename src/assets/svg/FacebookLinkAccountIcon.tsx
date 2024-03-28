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
    <Rect width={32} height={32} rx={8} fill="#F5F5F5" />
    <Path
      d="M18 17.5H20.5L21.5 13.5H18V11.5C18 10.47 18 9.5 20 9.5H21.5V6.14C21.174 6.097 19.943 6 18.643 6C15.928 6 14 7.657 14 10.7V13.5H11V17.5H14V26H18V17.5Z"
      fill="black"
    />
  </Svg>
);
export default SVGComponent;
