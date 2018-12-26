import React, { Component } from 'react';
import { View, Text, Button, Slider, Switch, TouchableOpacity } from 'react-native';
import styles from './styles';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from 'app/utils/androidBackButton';
import Svg, { Rect } from 'react-native-svg';
import SvgUri from 'react-native-svg-uri';
import icon from 'app/assets/fontawesome-free-5.6.1-desktop/svgs/regular/angry.svg';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import AppStyles from 'app/config/styles';

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
                <View style={[styles.header]}>
                    <View style={[styles.header_item]}>
                        <Text style={[styles.header_text]}>Options</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Home')}
                    >
                        <SvgUri
                            width="30"
                            height="30"
                            fill='#66CCFF'
                            source={{uri: resolveAssetSource(require('app/assets/fontawesome-free-5.6.1-desktop/svgs/solid/times.svg')).uri}}
                        />                    
                    </TouchableOpacity>
                </View>
                <View style={[styles.container, styles.body]}>
                    <View style={[styles.container, styles.body_item]}>  
                        <Text style={styles.body_item_text}>
                            Number of rows: {rows}
                        </Text>                  
                        <Slider 
                            step={1}              
                            minimumValue={5}
                            maximumValue={10}
                            minimumTrackTintColor='#66CCFF'
                            thumbTintColor='#66CCFF'
                            value={rows}
                            onValueChange={value => changeNumberRows(value)}
                        />
                        <View style = {styles.hairline} />
                        <Text style={styles.body_item_text}>
                            Number of columns: {cols}
                        </Text>  
                        <Slider 
                            step={1}              
                            minimumValue={5}
                            maximumValue={10}
                            minimumTrackTintColor='#66CCFF'
                            thumbTintColor='#66CCFF'
                            value={cols}
                            onValueChange={value => changeNumberCols(value)}
                        />   
                        <View style = {styles.hairline} />          
                        <Text style={styles.body_item_text}>
                            Practice reverse translation:
                        </Text>                  
                        <Switch 
                            thumbColor='#66CCFF'
                            value={practiceBothway}
                            onValueChange={() => togglePracticeBothway()}
                        />
                    </View>
                    <View style={[styles.container, styles.body]}>
                        <TouchableOpacity>
                            <View style={[styles.body_item]}>
                                <Text style={styles.body_item_text}>Help</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.body_item]}>
                                <Text style={styles.body_item_text}>Language</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.body_item]}>
                                <Text style={styles.body_item_text}>Reset progress</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.body_item]}>
                                <Text style={styles.body_item_text}>Rate</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={[styles.footer_text]}>Version: 1.0</Text>
                </View>
            </View>
        );
    }
}

export default OptionsView;
