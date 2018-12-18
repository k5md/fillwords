import React, { Component } from 'react';
import { View, Text, Button, Slider, Switch, Picker } from 'react-native';
import styles from './styles';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from 'app/utils/androidBackButton';

class OptionsView extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        console.log('unmounting options');
        removeAndroidBackButtonHandler();
    }    

    componentDidMount() {
        handleAndroidBackButton(() => {
            console.log('back');
            this.props.navigation.navigate('Home');
            console.log('clearing');
        });
    }

    render() {
        const {
            rows,
            cols,
            practiceBothway,
            languagePack,
            changeNumberRows,
            changeNumberCols,
            togglePracticeBothway,
            setLanguagePack 
        } = this.props;

        return (
            <View style={styles.container}>
                <Text>Options</Text>
                <Button
                    title="Back"
                    onPress={() => this.props.navigation.navigate('Home')}
                />   
                <Text>
                    Number of rows:
                </Text>                  
                <Slider 
                    step={1}              
                    minimumValue={5}
                    maximumValue={10}
                    value={rows}
                    onValueChange={value => changeNumberRows(value)}
                />
                <Text>
                    {rows}
                </Text>
                <Text>
                    Number of columns:
                </Text>  
                <Slider 
                    step={1}              
                    minimumValue={5}
                    maximumValue={10}
                    value={cols}
                    onValueChange={value => changeNumberCols(value)}
                />
                <Text>
                    {cols}
                </Text>                
                <Text>
                    Language pack:
                </Text>  
                <Text>
                Practice reverse translation:
                </Text>                  
                <Switch 
                    value={practiceBothway}
                    onValueChange={() => togglePracticeBothway()}
                />   
            </View>
        );
    }
}

export default OptionsView;
