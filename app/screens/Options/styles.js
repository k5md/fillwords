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
    fontSize: fontSizes.FONT_SIZE_SMALL,
  },
  container: {
    flex: 1,
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
    fontSize: fontSizes.FONT_SIZE_SMALL,
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
  header_button_back: {

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
  help_text: {
    fontSize: fontSizes.FONT_SIZE_BASE,
  },
  words_preview_button: {
    alignItems: 'center',
    backgroundColor: color.COLOR_WHITE,
    borderColor: color.COLOR_BLACK_TRANSP,
    borderRadius: 1,
    borderWidth: 2,
    justifyContent: 'center',
    margin: 0,
  },
  words_preview_button_text: {
    fontSize: fontSizes.FONT_SIZE_BASE, // 8
  },
  words_preview_container: {
    alignItems: 'center',
    borderColor: color.COLOR_BLACK_TRANSP,
    borderRadius: 1,
    borderWidth: 2,
    display: 'flex',
    height: '80%',
    justifyContent: 'center',
    marginTop: '15%',
    shadowColor: color.COLOR_GREY_TRANSP,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    width: '80%',
  },
  words_preview_title: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  words_preview_title_hairline: {
    alignSelf: 'center',
    borderColor: color.COLOR_GREY,
    borderWidth: 1,
    flex: 0,
    opacity: 0.7,
    paddingLeft: '35%',
    paddingRight: '35%',
  },
  words_preview_title_text: {
    fontSize: fontSizes.FONT_SIZE_NORMAL, // default 36,
    fontWeight: 'bold',
  },
});

export default styles;
