/*
 * Provides universal color configs used in the app.
 * Provides universal fonts used in the app.
 */
import metrics from './metrics';

const { screenHeight } = metrics;

const fontSizeBase = Math.floor(screenHeight / 40);
const fontSizeSmall = fontSizeBase + 4;
const fontSizeNormal = fontSizeBase + 20;
const fontSizeLarge = fontSizeBase + 54;

const AppStyles = {
  color: {
    COLOR_PRIMARY: '#2ec7ab',
    COLOR_SECONDARY: '#111',
    COLOR_WHITE: '#FFFFFF',
    COLOR_BLACK: '#000000',
    COLOR_BLUE_LIGHT: '#66CCFF',
    COLOR_GREY: 'grey',
    COLOR_GREEN: 'green',
    COLOR_PLACEHOLDER: '#111111',
    COLOR_GREY_WHITE: '#fafafa',
    COLOR_GREYISH: '#ebebeb',
    COLOR_DARK_SEPERATOR: '#d4d4d4',
    COLOR_BLACK_TRANSP: 'rgba(0, 0, 0, 0.7)',
    COLOR_GREY_TRANSP: 'rgba(67, 85, 85, 0.7)',
  },
  fonts: {
    FONT_REGULAR: 'Roboto-Regular',
    FONT_MEDIUM: 'Roboto-Medium',
  },
  fontSizes: {
    FONT_SIZE_BASE: fontSizeBase,
    FONT_SIZE_SMALL: fontSizeSmall,
    FONT_SIZE_NORMAL: fontSizeNormal,
    FONT_SIZE_LARGE: fontSizeLarge,
  },
};

export default AppStyles;
