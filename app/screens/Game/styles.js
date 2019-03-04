import { StyleSheet } from 'react-native';
import AppStyles from '../../config/styles';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  field: {
    backgroundColor: color.COLOR_GREYISH,
    flex: 5,
  },
  words: {
    backgroundColor: color.COLOR_GREYISH,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  word_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  word_text: {
    fontSize: fontSizes.FONT_SIZE_SMALL, // fontSize / 2,
  },
  button_left: {
    minWidth: 50,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  button_right: {
    minWidth: 50,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  button_text: {
    lineHeight: fontSizes.FONT_SIZE_LARGE,
    fontSize: fontSizes.FONT_SIZE_LARGE, // 70,
    color: color.COLOR_BLACK_TRANSP,
  },
  button_disabled: {
    opacity: 0,
  },
  cell_outer_container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  cell_container: {
    width: '100%',
    height: '100%',
    padding: 5,
  },
  cell: {
    backgroundColor: color.COLOR_BLACK_TRANSP,
    borderWidth: 1,
    borderColor: color.COLOR_BLACK_TRANSP,
    borderRadius: 3,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell_backface: {
  },
  cell_selected: {
    backgroundColor: color.COLOR_BLUE_LIGHT,
  },
  cell_text: {
    fontSize: fontSizes.FONT_SIZE_NORMAL,
    color: color.COLOR_GREYISH,
  },
  connections: {
    flex: 1,
    alignItems: 'stretch',
    flexWrap: 'wrap',
  },
  hairline: {
    borderWidth: 1,
    borderColor: color.COLOR_GREY,
    opacity: 0.7,
    flex: 0,
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
  words_preview_content_entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  words_preview_content_entry_text: {
    fontSize: fontSizes.FONT_SIZE_BASE, // 16 / 2.5,
    lineHeight: fontSizes.FONT_SIZE_SMALL,
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
  game_end_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
    height: '30%',
    width: '80%',
    borderWidth: 2,
    borderRadius: 1,
    display: 'flex',
    shadowColor: color.COLOR_GREY_TRANSP,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderColor: color.COLOR_BLACK_TRANSP,
  },
});

export default styles;
