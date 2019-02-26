import React, { Component } from 'react';
import { View, Text, Button, Slider, Switch, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from 'app/utils/androidBackButton';
import Svg, { Rect } from 'react-native-svg';
import SvgUri from 'react-native-svg-uri';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import AppStyles from 'app/config/styles';
import images from 'app/config/images';

import dictionary from 'app/utils/Dictionaries';
import dictionariesConfig from 'app/constants/dictionariesConfig';

class StatisticsView extends Component {
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
        } = this.props;

        return (
            <View style={styles.container}>
                <View style={[styles.header]}>
                    <View style={[styles.header_item]}>
                        <Text style={[styles.header_text]}>Statistics</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Home')}
                    >
                        <SvgUri
                            width="30"
                            height="30"
                            fill='#66CCFF'
                            svgXmlData={images.icons.times}
                        />                    
                    </TouchableOpacity>
                </View>
                <ScrollView style={[styles.container, styles.body]}>
                    <View style={[styles.container, styles.body_item]}>
                      <View style={styles.container_space_between}>
                        <Text style={styles.body_item_text}>
                            Current dictionary:
                        </Text>
                        <Text style={styles.body_item_text}>
                            {dictionariesConfig.DICTIONARIES[languagePack].displayName}:
                        </Text>
                      </View>
                        <View style = {styles.hairline} />
                        <Text style={styles.body_item_text}>
                            Total words:
                        </Text>
                        <Text style={styles.body_item_text}>
                            {dictionariesConfig.DICTIONARIES[languagePack].entriesCount}
                        </Text>
                        <View style = {styles.hairline} />          
                        <Text style={styles.body_item_text}>
                            Words to learn:
                        </Text>    
                        <Text style={styles.body_item_text}>
                            Level 0:
                        </Text>
                        <Text style={styles.body_item_text}>
                            {this.dictionary.countWords({srsStatus: 0})}
                        </Text>
                        <View style = {styles.hairline} />    
                        <Text style={styles.body_item_text}>
                            Level 1:
                        </Text>
                        <Text style={styles.body_item_text}>
                            {this.dictionary.countWords({srsStatus: 1})}
                        </Text>               
                        <View style = {styles.hairline} />
                        <Text style={styles.body_item_text}>
                            Level 2:
                        </Text>
                        <Text style={styles.body_item_text}>
                            {this.dictionary.countWords({srsStatus: 2})}
                        </Text> 
                        <View style = {styles.hairline} />          
                        <Text style={styles.body_item_text}>
                            Level 3:
                        </Text>
                        <Text style={styles.body_item_text}>
                            {this.dictionary.countWords({srsStatus: 3})}
                        </Text>
                        <View style = {styles.hairline} />          
                        <Text style={styles.body_item_text}>
                            Level 4:
                        </Text>
                        <Text style={styles.body_item_text}>
                            {this.dictionary.countWords({srsStatus: 4})}
                        </Text> 
                    </View>
                </ScrollView>
                <View style={styles.footer} />
            </View>
        );
    }
}

export default StatisticsView;
