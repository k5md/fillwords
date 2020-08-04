import { StyleSheet } from 'react-native';
import AppStyles from '../../config/styles';

const { color } = AppStyles;

const styles = StyleSheet.create({
  container: {
    borderColor: color.COLOR_GREYISH,
    borderWidth: 0.5,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default styles;
