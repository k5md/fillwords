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
        fontSize: fontSize / 2,
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
        fontSize: fontSize,
        fontWeight: 'bold',
    },
    words_preview_content_entry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    words_preview_content_entry_text: {
        fontSize: fontSize / 2.5,
        lineHeight: fontSize,
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
        fontSize: fontSize / 2,
    },
    game_end_container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%',
        height: '30%',
        width: '75%',
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
