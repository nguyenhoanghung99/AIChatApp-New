import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SendIcon = (props: any) => (
  <Svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
  >
    <Path
      fill="#379AE6"
      d="M16.608 15.35a1.115 1.115 0 0 1-1.234.334L9.753 13.76a.282.282 0 0 1-.19-.267V8.438a.563.563 0 0 0-.6-.562.576.576 0 0 0-.525.58v5.033a.281.281 0 0 1-.19.266l-5.625 1.93a1.125 1.125 0 0 1-1.354-1.612L8.016 2.26a1.125 1.125 0 0 1 1.96 0l6.751 11.81a1.117 1.117 0 0 1-.12 1.28Z"
    />
  </Svg>
)
export default SendIcon;