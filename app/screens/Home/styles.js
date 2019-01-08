import { StyleSheet } from 'react-native';
import AppStyles from 'app/config/styles';
const { color, fonts } = AppStyles;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        paddingTop: 250,
        fontSize: 100,
        flex: 3,
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
        flex: 2,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    body: {
        flex: 1,
        backgroundColor: color.COLOR_GREYISH,
    },
});

export default styles;
