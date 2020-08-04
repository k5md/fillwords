import { StyleSheet } from 'react-native';
import AppStyles from '../../config/styles';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  container: {
    flex: 1,
    borderColor: color.COLOR_BLACK_TRANSP,
    borderRadius: 1,
    borderWidth: 2,
    shadowColor: color.COLOR_GREY_TRANSP,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    justifyContent: 'center',
  },
  content: {
    marginTop: '2%',
    flex: 1,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title_text: {
    fontSize: fontSizes.FONT_SIZE_NORMAL, // default 36,
    fontWeight: 'bold',
  },
  hairline: {
    alignSelf: 'center',
    borderColor: color.COLOR_GREY,
    borderWidth: 1,
    flex: 0,
    opacity: 0.7,
    paddingLeft: '35%',
    paddingRight: '35%',
  },
});

export default styles;
