import { StyleSheet } from 'react-native';
import AppStyles from '../../config/styles';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: color.COLOR_BLACK_TRANSP,
  },
  header_item: {
    flex: 1,
  },
  header_text: {
    color: color.COLOR_WHITE,
    fontFamily: 'Verdana',
    fontSize: fontSizes.FONT_SIZE_SMALL,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header_button_back: {

  },
  body: {
    flex: 1,
    backgroundColor: color.COLOR_GREYISH,
  },
  body_item: {
    margin: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: color.COLOR_WHITE,
  },
  body_item_text: {
    fontFamily: 'Verdana',
    fontSize: fontSizes.FONT_SIZE_SMALL,
  },
  footer: {
    flex: 0,
    minHeight: 55,
    padding: 10,
    backgroundColor: color.COLOR_BLACK_TRANSP,
    alignItems: 'flex-end',
  },
  footer_text: {
    color: color.COLOR_WHITE,
    fontFamily: 'Verdana',
    fontSize: fontSizes.FONT_SIZE_SMALL,
  },
  hairline: {
    borderWidth: 0.5,
    borderColor: color.COLOR_GREYISH,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default styles;
