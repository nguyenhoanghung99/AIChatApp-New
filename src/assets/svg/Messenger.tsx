import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Messenger({ height = 100, width = 100, color = "#8C8C8C" }: { height?: number, width?: number, color?: string }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
    >
      <Path
        d="M8.334 50C8.334 26.989 26.988 8.335 50 8.335c23.013 0 41.667 18.654 41.667 41.667 0 23.012-18.654 41.666-41.667 41.666H8.334l12.204-12.204A41.537 41.537 0 018.334 50.001zM28.45 83.335H50a33.333 33.333 0 10-33.333-33.333 33.2 33.2 0 009.762 23.57l5.892 5.892-3.87 3.871zm4.884-29.167h33.333a16.667 16.667 0 01-33.334 0z"
        fill={color}
      />
    </Svg>
  )
}

export default Messenger
