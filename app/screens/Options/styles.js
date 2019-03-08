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
  words_preview_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15%',
    height: '80%',
    width: '80%',
    borderWidth: 2,
    borderRadius: 1,
    display: 'flex',
    shadowColor: color.COLOR_GREY_TRANSP,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderColor: color.COLOR_BLACK_TRANSP,
  },
  words_preview_title_hairline: {
    paddingLeft: '35%',
    paddingRight: '35%',
    flex: 0,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: color.COLOR_GREY,
    opacity: 0.7,
  },
  words_preview_title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  words_preview_title_text: {
    fontSize: fontSizes.FONT_SIZE_NORMAL, // default 36,
    fontWeight: 'bold',
  },
  help_text: {
    fontSize: fontSizes.FONT_SIZE_BASE,
  },
  words_preview_button: {
    margin: 0,
    borderWidth: 2,
    borderRadius: 1,
    borderColor: color.COLOR_BLACK_TRANSP,
    backgroundColor: color.COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  words_preview_button_text: {
    fontSize: fontSizes.FONT_SIZE_BASE, // 8
  },
});

export default styles;
