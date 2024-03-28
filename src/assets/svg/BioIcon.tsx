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
    <Rect width={32} height={32} rx={8} fill="#FF9500" />
    <Path
      d="M16.9 10.86L21.142 15.103L11.242 25.002H7V20.759L16.9 10.86ZM18.314 9.44604L20.435 7.32404C20.6225 7.13657 20.8768 7.03125 21.142 7.03125C21.4072 7.03125 21.6615 7.13657 21.849 7.32404L24.678 10.153C24.8655 10.3406 24.9708 10.5949 24.9708 10.86C24.9708 11.1252 24.8655 11.3795 24.678 11.567L22.556 13.688L18.314 9.44604Z"
      fill="white"
    />
  </Svg>
);
export default SVGComponent;
