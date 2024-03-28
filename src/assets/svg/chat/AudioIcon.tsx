import * as React from "react"
import Svg, { Path } from "react-native-svg"
const AudioIcon = (props: any) => (
  <Svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
  >
    <Path
      fill="#379AE6"
      d="M18.15 2.2H3.85a.55.55 0 0 0-.55.55v16.5c0 .304.246.55.55.55h14.3a.55.55 0 0 0 .55-.55V2.75a.55.55 0 0 0-.55-.55ZM14.3 15.328l-4.017-2.678H7.7a.55.55 0 0 1-.55-.55V9.9a.55.55 0 0 1 .55-.55h2.583L14.3 6.672v8.656Z"
    />
  </Svg>
)
export default AudioIcon;
  