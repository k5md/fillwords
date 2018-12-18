import React, { Component } from 'react';
import { View, Alert, Text, Button, BackHandler, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from 'react-native-material-ui';
import styles from './styles';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from 'app/utils/androidBackButton';

class HomeView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        handleAndroidBackButton(() => {
            Alert.alert(
                'Confirm exit',
                'Do you want to quit the app?',
                [
                  {text: 'CANCEL', style: 'cancel'},
                  {text: 'OK', onPress: () => BackHandler.exitApp()}
                ]
            );
        });
    }

    componentWillUnmount() {
        removeAndroidBackButtonHandler();
        console.log('unmounting homeview');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>FILLWORDS</Text>
                <FlatList
                    horizontal={true}
                    data={[{key: 'Game'}, {key: 'Options'}, {'key': 'Statistics'}]}
                    renderItem={({item}) => (
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate(item.key)}
                        >
                            <Text>{item.key}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

export default HomeView;
