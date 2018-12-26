import { StyleSheet } from 'react-native';
import AppStyles from 'app/config/styles';
const { color, fonts } = AppStyles;

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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
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
        fontSize: 20,
    },
    footer: {
        flex: 0,
        padding: 10,
        backgroundColor: color.COLOR_BLACK_TRANSP,
        alignItems: 'flex-end'
    },
    footer_text: {
        color: color.COLOR_WHITE,
        fontFamily: 'Verdana',
        fontSize: 20,
    },
    hairline: {
        borderWidth: 0.5,
        borderColor: color.COLOR_GREYISH,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default styles;
