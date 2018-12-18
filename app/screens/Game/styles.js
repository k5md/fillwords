import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0,
        margin: 1,
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemActive: {
        backgroundColor: '#5F253F',
    },
    itemText: {
        color: '#000',
    },
    wrapper: {
    },  
    guessed: {
        backgroundColor: 'rgba(0,255,0,0.5)',
    },
    notGuessed: {
        backgroundColor: 'rgba(0,0,255,0.5)',
    },
    cell: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        flex: 0,
        backfaceVisibility: 'hidden',
    },
    connections: {
        flex: 1,
        alignItems: 'stretch',
        flexWrap: 'wrap',
    }
});

export default styles;