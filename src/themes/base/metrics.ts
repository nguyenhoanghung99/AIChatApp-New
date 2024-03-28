import {Dimensions, Platform} from 'react-native';
import {IHitSlop, IShadow} from './types';
import {colors} from './colors';

const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;
const {width, height} = Dimensions.get('window');

function responsiveWidth<T extends number>(value: T) {
  return ((width * value) / DESIGN_WIDTH) as T;
}

function responsiveHeight<T extends number>(value: T) {
  return ((height * value) / DESIGN_HEIGHT) as T;
}

function responsiveFont<T extends number>(value: T) {
  return ((width * value) / DESIGN_WIDTH) as T;
}

function deviceWidth(): number {
  return width;
}

function deviceHeight(): number {
  return height;
}

const isIOS: boolean = Platform.OS === 'ios';

const shadow: IShadow = {
  shadowColor: colors.dark.black,
  shadowRadius: 5,
  elevation: 5,
  shadowOpacity: 0.2,
  shadowOffset: {width: 0, height: 3},
};
const hitSlop: IHitSlop = {
  top: 10,
  bottom: 10,
  right: 10,
  left: 10,
};

const metrics = {
  // Text Size
  heading1: responsiveFont(20),
  heading2: responsiveFont(18),
  span: responsiveFont(14),
  sizeXxl: responsiveFont(30),

  // spacing
  minusSmall: responsiveHeight(-10),
  reset: responsiveHeight(0),
  tiny: responsiveHeight(4),
  xxs: responsiveHeight(8),
  xs: responsiveHeight(12),
  small: responsiveHeight(14),
  sMedium: responsiveHeight(16),
  medium: responsiveHeight(20),
  large: responsiveHeight(24),
  xl: responsiveHeight(28),
  xxl: responsiveHeight(32),
  huge: responsiveHeight(48),
  massive: responsiveHeight(64),

  borderRadius: responsiveHeight(4),
  borderRadiusSm: responsiveHeight(8),
  borderRadiusSMedium: responsiveHeight(12),
  borderRadiusMd: responsiveHeight(20),
  borderRadiusLg: responsiveHeight(25),
  borderRadiusXl: responsiveHeight(32),
  borderRadiusXxl: responsiveHeight(40),
  // margin
  marginTop: responsiveHeight(12),
  marginTinyHorizontal: responsiveWidth(12),
  marginLgHorizontal: responsiveWidth(22),
  marginVertical: responsiveWidth(16),
  paddingHorizontal: responsiveWidth(20),

  voucherBorderRadius: responsiveHeight(15),
  logoWidth: responsiveWidth(300),
  logoHeight: responsiveHeight(70),
  icon: responsiveHeight(30),
} as const;

const FontSizes = {
  tiny: responsiveFont(10),
  small: responsiveFont(12),
  span: responsiveFont(14),
  body: responsiveFont(16),
  large: responsiveFont(18),
  xlarge: responsiveFont(20),
  title: responsiveFont(22),
  heading5: responsiveFont(24),
  titleLarge: responsiveFont(24),
  heading4: responsiveFont(28),
  heading3: responsiveFont(32),
};

export {
  metrics,
  FontSizes,
  isIOS,
  shadow,
  hitSlop,
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
  deviceWidth,
  deviceHeight,
  width,
  height,
};
