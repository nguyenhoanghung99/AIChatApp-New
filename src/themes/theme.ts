import {createTheme} from '@shopify/restyle';
import {FontSizes, colors, fonts, metrics} from './base';

const theme = createTheme({
  colors: {
    ...colors.light,
  },
  borderRadii: {
    reset: metrics.reset,
    xs: metrics.borderRadius,
    xxs: metrics.xxs,
    sm: metrics.borderRadiusSm,
    base: metrics.borderRadiusSMedium,
    md: metrics.borderRadiusMd,
    lg: metrics.borderRadiusLg,
    xl: metrics.borderRadiusXl,
    huge: metrics.huge,
    massive: metrics.massive,
    xxl: metrics.borderRadiusXxl,
  },
  spacing: {
    minusSmall: metrics.minusSmall,
    reset: metrics.reset,
    tiny: metrics.tiny,
    xxs: metrics.xxs,
    xs: metrics.xs,
    sm: metrics.small,
    base: metrics.sMedium,
    md: metrics.medium,
    lg: metrics.large,
    xl: metrics.xl,
    xxl: metrics.xxl,
    huge: metrics.huge,
    massive: metrics.massive,
  },
  textVariants: {
    defaults: {
      fontSize: FontSizes.body,
      fontFamily: fonts.Regular,
    },
    heading1: {
      fontSize: FontSizes.title,
      fontFamily: fonts.Bold,
    },
    heading2: {
      fontSize: FontSizes.xlarge,
      fontFamily: fonts.SemiBold,
    },
    headingS2: {
      fontSize: FontSizes.xlarge,
      fontFamily: fonts.SemiBold,
    },
    heading3: {
      fontSize: FontSizes.large,
      fontFamily: fonts.SemiBold,
    },
    headingR3: {
      fontSize: FontSizes.large,
      fontFamily: fonts.Regular,
    },
    heading5: {
      fontSize: FontSizes.titleLarge,
      fontFamily: fonts.SemiBold,
    },
    span: {
      fontSize: FontSizes.span,
      fontFamily: fonts.Regular,
    },
    small: {
      fontSize: FontSizes.small,
      fontFamily: fonts.Regular,
    },
    tiny: {
      fontSize: FontSizes.tiny,
    },
    baseSemiBold: {
      fontSize: FontSizes.body,
      fontFamily: fonts.SemiBold,
    },
    spanSemibold: {
      fontSize: FontSizes.span,
      fontFamily: fonts.Bold,
    },
    sMedium: {
      fontSize: FontSizes.body,
      fontFamily: fonts.SemiBold,
    },
    rMedium: {
      fontSize: FontSizes.body,
      fontFamily: fonts.Regular,
    },
    rSmall: {
      fontSize: FontSizes.small,
      fontFamily: fonts.Regular,
    },

  },
});

const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    ...colors.dark,
  },
};

export type Theme = typeof theme;
export {theme, darkTheme};
