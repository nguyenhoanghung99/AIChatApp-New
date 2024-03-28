import * as React from "react"
import Svg, { Circle, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';

const LocationChat = (props: any) => (
    <Svg width={57} height={57} viewBox="0 0 57 57" fill="none">
        <G filter="url(#filter0_d_14821_71721)">
            <Circle
                cx={28.5898}
                cy={24.748}
                r={16}
                fill="url(#paint0_linear_14821_71721)"
            />
            <Path
                d="M28.59 24.332a2.083 2.083 0 110-4.167 2.083 2.083 0 010 4.167zm0-7.917a5.833 5.833 0 00-5.834 5.833c0 4.375 5.833 10.834 5.833 10.834s5.834-6.459 5.834-10.834a5.833 5.833 0 00-5.834-5.833z"
                fill="#fff"
            />
        </G>
        <Circle cx={28.5898} cy={45.748} r={2} fill="#EB4C60" />
        <Defs>
            <LinearGradient
                id="paint0_linear_14821_71721"
                x1={12.5898}
                y1={25.1805}
                x2={50.2565}
                y2={25.1805}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#EB4C60" />
                <Stop offset={0.510162} stopColor="#EB4C60" />
                <Stop offset={0.824931} stopColor="#EB4C60" />
            </LinearGradient>
        </Defs>
    </Svg>
)
export default LocationChat
