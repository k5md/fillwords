import { StyleSheet } from 'react-native';
import AppStyles from '../../config/styles';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  background: {
    alignItems: 'flex-start',
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
  },
  body: {
    backgroundColor: color.COLOR_GREYISH,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
    padding: 10,
    width: 100,
  },
  button_play: {
    height: 150,
    width: 150,
  },
  container: {
    flex: 1,
  },
  container_buttons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  help_text: {
    fontSize: fontSizes.FONT_SIZE_BASE,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title_sub: {

  },
  title_text: {
    color: color.COLOR_BLACK_TRANSP,
    fontFamily: 'sans-serif-condensed',
    fontSize: fontSizes.FONT_SIZE_LARGE,
  },
  words_preview_container: {
    alignItems: 'center',
    borderColor: color.COLOR_BLACK_TRANSP,
    borderRadius: 1,
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'center',
    shadowColor: color.COLOR_GREY_TRANSP,
    shadowOpacity: 0.4,
    shadowRadius: 10,
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
