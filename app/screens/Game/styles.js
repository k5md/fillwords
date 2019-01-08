import { StyleSheet } from 'react-native';
import AppStyles from 'app/config/styles';
const { color, fonts } = AppStyles;
import metrics from 'app/config/metrics';
const { screenHeight, screenWidth } = metrics;
const fontSize = Math.floor(screenHeight / 40) + 20;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    field: {
        backgroundColor: color.COLOR_GREYISH,
        flex: 1,
        minHeight: 800,
    },
    words: {
        backgroundColor: color.COLOR_GREYISH,
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    word_container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    word_guessed: {

    },
    word: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    word_text: {
        fontSize: fontSize - 20,
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
        lineHeight: 70,
        fontSize: 70,
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
        fontSize,
        color: color.COLOR_GREYISH,
    },
    connections: {
        flex: 1,
        alignItems: 'stretch',
        flexWrap: 'wrap',
    },
    hairline: {
        borderWidth: 1,
        borderColor: color.COLOR_GRAY,
        opacity: 0.7,
        flex: 0,
    },
});

export default styles;