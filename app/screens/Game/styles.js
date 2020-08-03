import { StyleSheet } from 'react-native';
import AppStyles from '../../config/styles';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  button_close: {
    justifyContent: 'flex-end',
  },
  button_disabled: {
    opacity: 0,
  },
  button_left: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
    opacity: 0.7,
  },
  button_right: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
    opacity: 0.7,
  },
  button_text: {
    lineHeight: fontSizes.FONT_SIZE_LARGE,
    fontSize: fontSizes.FONT_SIZE_LARGE, // 70,
    color: color.COLOR_BLACK_TRANSP,
  },
  cell: {
    alignItems: 'center',
    backgroundColor: color.COLOR_BLACK_TRANSP,
    borderColor: color.COLOR_BLACK_TRANSP,
    borderRadius: 3,
    borderWidth: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  cell_backface: {
  },
  cell_container: {
    height: '100%',
    padding: 5,
    width: '100%',
  },
  cell_outer_container: {
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    flex: 0,
    justifyContent: 'center',
    position: 'absolute',
  },
  cell_selected: {
    backgroundColor: color.COLOR_BLUE_LIGHT,
  },
  cell_text: {
    color: color.COLOR_GREYISH,
    fontSize: fontSizes.FONT_SIZE_NORMAL,
  },
  connections: {
    alignItems: 'stretch',
    flex: 1,
    flexWrap: 'wrap',
  },
  container: {
    flex: 1,
  },
  field: {
    backgroundColor: color.COLOR_GREYISH,
    flex: 5,
  },
  game_end_container: {
    alignItems: 'center',
    borderColor: color.COLOR_BLACK_TRANSP,
    borderRadius: 1,
    borderWidth: 2,
    display: 'flex',
    height: '30%',
    justifyContent: 'center',
    marginTop: '30%',
    shadowColor: color.COLOR_GREY_TRANSP,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    width: '80%',
  },
  hairline: {
    borderColor: color.COLOR_GREY,
    borderWidth: 1,
    flex: 0,
    opacity: 0.7,
  },
  header: {
    backgroundColor: color.COLOR_BLACK_TRANSP,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
  word: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  word_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  word_text: {
    fontSize: fontSizes.FONT_SIZE_SMALL, // fontSize / 2,
  },
  words: {
    backgroundColor: color.COLOR_GREYISH,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  words_preview_button: {
    margin: 0,
    marginLeft: '10%',
    marginRight: '10%',
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
  words_preview_content: {
    marginLeft: '2%',
    marginTop: '2%',
    width: '50%',
  },
  words_preview_content_entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  words_preview_content_entry_text: {
    fontSize: fontSizes.FONT_SIZE_BASE, // 16 / 2.5,
    lineHeight: fontSizes.FONT_SIZE_SMALL,
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
