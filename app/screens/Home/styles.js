import { StyleSheet } from 'react-native';
import AppStyles from '../../config/styles';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title_text: {
    fontSize: fontSizes.FONT_SIZE_LARGE,
    fontFamily: 'sans-serif-condensed',
    color: color.COLOR_BLACK_TRANSP,
  },
  title_sub: {

  },
  background: {
    top: 0,
    left: 0,
    position: 'absolute',
    overflow: 'hidden',
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  button: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  button_play: {
    width: 150,
    height: 150,
  },
  container_buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: color.COLOR_GREYISH,
  },
});

export default styles;
