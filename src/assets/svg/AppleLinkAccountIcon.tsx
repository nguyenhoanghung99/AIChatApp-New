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
      d="M15.6241 11.2236C14.7481 11.2236 13.3921 10.2276 11.9641 10.2636C10.0801 10.2876 8.35206 11.3556 7.38006 13.0476C5.42406 16.4436 6.87606 21.4596 8.78406 24.2196C9.72006 25.5636 10.8241 27.0756 12.2881 27.0276C13.6921 26.9676 14.2201 26.1156 15.9241 26.1156C17.6161 26.1156 18.0961 27.0276 19.5841 26.9916C21.0961 26.9676 22.0561 25.6236 22.9801 24.2676C24.0481 22.7076 24.4921 21.1956 24.5161 21.1116C24.4801 21.0996 21.5761 19.9836 21.5401 16.6236C21.5161 13.8156 23.8321 12.4716 23.9401 12.4116C22.6201 10.4796 20.5921 10.2636 19.8841 10.2156C18.0361 10.0716 16.4881 11.2236 15.6241 11.2236ZM18.7441 8.39156C19.5241 7.45556 20.0401 6.14756 19.8961 4.85156C18.7801 4.89956 17.4361 5.59556 16.6321 6.53156C15.9121 7.35956 15.2881 8.69156 15.4561 9.96356C16.6921 10.0596 17.9641 9.32756 18.7441 8.39156Z"
      fill="black"
    />
  </Svg>
);
export default SVGComponent;
