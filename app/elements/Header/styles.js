import { StyleSheet } from 'react-native';
import AppStyles from '../../config/styles';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: color.COLOR_BLACK_TRANSP,
  },
  text_container: {
    flex: 1,
  },
  text: {
    color: color.COLOR_WHITE,
    fontFamily: 'Verdana',
    fontSize: fontSizes.FONT_SIZE_SMALL, // 20px was default
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
