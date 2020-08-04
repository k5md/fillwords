import { StyleSheet } from 'react-native';
import AppStyles from '../../config/styles';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  body: {
    backgroundColor: color.COLOR_GREYISH,
    flex: 1,
  },
  body_item: {
    backgroundColor: color.COLOR_WHITE,
    borderRadius: 5,
    margin: 20,
    padding: 10,
  },
  body_item_text: {
    fontFamily: 'Verdana',
    fontSize: fontSizes.FONT_SIZE_SMALL, // 20px was default
  },
  container: {
    flex: 1,
  },
  container_space_between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flow_right: {
    alignItems: 'flex-end',
  },
  footer: {
    alignItems: 'flex-end',
    backgroundColor: color.COLOR_BLACK_TRANSP,
    flex: 0,
    minHeight: 55,
    padding: 10,
  },
  footer_text: {
    color: color.COLOR_WHITE,
    fontFamily: 'Verdana',
    fontSize: fontSizes.FONT_SIZE_SMALL, // 20px was default
  },
  hairline: {
    borderColor: color.COLOR_GREYISH,
    borderWidth: 0.5,
    marginBottom: 10,
    marginTop: 10,
  },
  header: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: color.COLOR_BLACK_TRANSP,
  },
  header_button_back: {},
  header_item: {
    flex: 1,
  },
  header_text: {
    color: color.COLOR_WHITE,
    fontFamily: 'Verdana',
    fontSize: fontSizes.FONT_SIZE_SMALL, // 20px was default
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
