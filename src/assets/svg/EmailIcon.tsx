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
    <Rect width={32} height={32} rx={8} fill="#FFCC00" />
    <Path
      d="M7 7H25C25.2652 7 25.5196 7.10536 25.7071 7.29289C25.8946 7.48043 26 7.73478 26 8V24C26 24.2652 25.8946 24.5196 25.7071 24.7071C25.5196 24.8946 25.2652 25 25 25H7C6.73478 25 6.48043 24.8946 6.29289 24.7071C6.10536 24.5196 6 24.2652 6 24V8C6 7.73478 6.10536 7.48043 6.29289 7.29289C6.48043 7.10536 6.73478 7 7 7ZM16.06 15.683L9.648 10.238L8.353 11.762L16.073 18.317L23.654 11.757L22.346 10.244L16.06 15.683Z"
      fill="white"
    />
  </Svg>
);
export default SVGComponent;
