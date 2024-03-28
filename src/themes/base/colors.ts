const colors: Record<ColorThemeName, ThemeColors> = {
  light: {
    white: '#FFFFFF',
    black: '#000000',
    bgBlack: '#FFFFFF',
    greyMenu: '#8C8C8C',
    marengo: '#1F1F1F',
    border: '#F3F4F6',
    neutralGrey3: '#F0F0F0',
    neutralGrey5: '#F5F5F5',
    neutralGrey4: '#D9D9D9',
    neutralGrey6: '#8C8C8C',
    neutralGrey7: '#727272',
    neutralGrey8: '#434343',
    neutralGrey9: '#262626',
    lightLink: '#007AFF',
    lightLinkOpacity: 'rgba(0, 122, 255, 0.1)',
    colorD9: '#D9D9D9',
    color17: '#171A1F',
    color90: '#9095A0',
    color37: '#379AE6',
    colorF8: '#F8F9FA',
    color26: '#262626',
    color8c: '#8C8C8C',
    colorF5: '#F5F5F5',
    colorF0: '#F0F0F0',
    color72: '#727272',
    yellow: '#FFCC00',
    blue: '#007AFF',
    purple: '#AF52DE',
    cyan: '#32ADE6',
    pink: '#FF2D55',
    colorBF: '#BFBFBF',
    success: '#34C759',
    warning: '#FF9500',
    indigo: '#5856D6',
    linear: '#00E5FF',
    lightRed: 'rgba(255, 59, 48, 0.1)',
    red: '#FF3B30',
    brown: '#A2845E',
    color32: '#323842',
    colorF1: '#F1F8FD',
    colorDE: '#DEE1E6',
    opacity: 'rgba(0, 0, 0, 0.5)',
    blur: 'rgba(0, 0, 0, 0.15)',
    danger: '#E05858',
    dangerOpacity: 'rgba(255, 59, 48, 0.1)',
    backdrop: 'rgba(23, 26, 31, 0.4)',
    borderBottom: '#E1E1E1',
    transparent: 'transparent',
    cloud: "#32ADE6",
  },
  dark: {
    white: '#000000',
    black: '#FFFFFF',
    bgBlack: '#000000',
    greyMenu: '#8C8C8C',
    marengo: '#1F1F1F',
    border: '#F3F4F6',
    color17: '#171A1F',
    color90: '#9095A0',
    colorF8: '#F8F9FA',
    color37: '#379AE6',
    neutralGrey3: '#F0F0F0',
    neutralGrey4: '#D9D9D9',
    neutralGrey5: '#F5F5F5',
    neutralGrey6: '#8C8C8C',
    neutralGrey7: '#727272',
    neutralGrey8: '#434343',
    neutralGrey9: '#262626',
    lightLink: '#007AFF',
    color26: '#171A1F',
    color8c: '#9095A0',
    colorF5: '#F8F9FA',
    colorF0: '#F0F0F0',
    color72: '#727272',
    yellow: '#FFCC00',
    blue: '#007AFF',
    purple: '#AF52DE',
    cyan: '#32ADE6',
    pink: '#FF2D55',
    colorBF: '#BFBFBF',
    success: '#34C759',
    warning: '#FF9500',
    indigo: '#5856D6',
    linear: '#00E5FF',
    lightRed: 'rgba(255, 59, 48, 0.1)',
    red: '#FF3B30',
    brown: '#A2845E',
    lightLinkOpacity: 'rgba(0, 122, 255, 0.1)',
    colorD9: '#D9D9D9',
    color32: '#323842',
    colorF1: '#F1F8FD',
    colorDE: '#DEE1E6',
    opacity: 'rgba(0, 0, 0, 0.5)',
    blur: 'rgba(0, 0, 0, 0.15)',
    danger: '#E05858',
    dangerOpacity: 'rgba(255, 59, 48, 0.1)',
    backdrop: 'rgba(23, 26, 31, 0.4)',
    borderBottom: '#E1E1E1',
    transparent: 'transparent',
    cloud: '#32ADE6',
  },
};
export type ColorThemeName = 'light' | 'dark';
export type ThemeColors = {
  white: string;
  black: string;
  bgBlack: string;
  greyMenu: string;
  marengo: string;
  border: string;
  neutralGrey3: string;
  neutralGrey4: string;
  neutralGrey7: string;
  neutralGrey5: string;
  neutralGrey6: string;
  neutralGrey8: string;
  neutralGrey9: string;
  lightLink: string;
  lightLinkOpacity: string;
  colorD9: string;
  color17: string;
  color90: string;
  color37: string;
  colorF8: string;
  color26: string;
  color8c: string;
  colorF5: string;
  colorF0: string;
  color72: string;
  yellow: string;
  blue: string;
  purple: string;
  cyan: string;
  pink: string;
  colorBF: string;
  success: string;
  warning: string;
  indigo: string;
  linear: string;
  lightRed: string;
  red: string;
  brown: string,
  color32: string;
  colorF1: string;
  colorDE: string;
  opacity: string;
  danger: string;
  dangerOpacity: string;
  backdrop: string;
  borderBottom: string;
  transparent: string;
  cloud: string;
  blur: string;
};

export type TColors = keyof typeof colors;

export {colors};
