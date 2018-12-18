import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        paddingTop: 200,
        fontSize: 50,
        flex: 3
    },
    button: {
        width: 100,
        height: 100,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor:'#68a0cf',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'    
    }
});

export default styles;
