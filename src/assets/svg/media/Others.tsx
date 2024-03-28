import * as React from "react"
import Svg, { Path } from "react-native-svg"
const OTHER = (props: any) => (
    <Svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={52}
        fill="none"
    >
        <Path
            fill="#A2845E"
            fillRule="evenodd"
            d="M7.323 0h17.392l14.732 15.37v29.858A6.775 6.775 0 0 1 32.675 52H7.323a6.775 6.775 0 0 1-6.772-6.772V6.772A6.775 6.775 0 0 1 7.323 0Z"
            clipRule="evenodd"
        />
        <Path
            fill="#fff"
            fillRule="evenodd"
            d="M24.693 0v15.237h14.754L24.693 0Z"
            clipRule="evenodd"
            opacity={0.302}
        />
    </Svg>
)
export default OTHER;