import { StyleSheet } from 'react-native';
import AppStyles from '../../config/styles';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    backgroundColor: color.COLOR_BLACK_TRANSP,
    flex: 0,
    minHeight: 55,
    padding: 10,
  },
  text: {
    color: color.COLOR_WHITE,
    fontFamily: 'Verdana',
    fontSize: fontSizes.FONT_SIZE_SMALL,
  },
});

export default styles;
