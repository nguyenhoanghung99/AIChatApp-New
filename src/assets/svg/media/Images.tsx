import * as React from "react"
import Svg, { Path } from "react-native-svg"
const IMAGES = (props: any) => (
    <Svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width={52}
        height={52}
        fill="none"
    >
        <Path
            fill="#0AC963"
            fillRule="evenodd"
            d="M13.323 0h17.392l14.732 15.37v29.858A6.775 6.775 0 0 1 38.675 52H13.323a6.775 6.775 0 0 1-6.772-6.772V6.772A6.775 6.775 0 0 1 13.323 0Z"
            clipRule="evenodd"
        />
        <Path
            fill="#fff"
            fillRule="evenodd"
            d="M30.693 0v15.237h14.754L30.693 0Z"
            clipRule="evenodd"
            opacity={0.302}
        />
        <Path
            fill="#fff"
            fillRule="evenodd"
            d="M32.607 25.98H19.392c-.99 0-1.803.814-1.803 1.803v8.4c0 .989.814 1.803 1.803 1.803h13.215c.99 0 1.78-.814 1.78-1.803v-8.4c0-.989-.79-1.803-1.78-1.803Zm-9.609 2.265c1.078 0 1.935.88 1.935 1.935a1.942 1.942 0 0 1-1.935 1.957 1.961 1.961 0 0 1-1.957-1.957c0-1.055.88-1.935 1.957-1.935ZM33.2 36.183c0 .33-.264.615-.593.615H19.392c-.33 0-.593-.286-.593-.615v-.352l2.396-2.397 1.98 1.98a.598.598 0 0 0 .857 0L29 30.443l4.2 4.2v1.539Z"
            clipRule="evenodd"
        />
    </Svg>
)
export default IMAGES;