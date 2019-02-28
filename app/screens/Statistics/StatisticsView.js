import React, { Component } from 'react';
import {
  View, Text, Button, Slider, Switch, ScrollView, TouchableOpacity,
} from 'react-native';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from 'app/utils/androidBackButton';
import Svg, { Rect } from 'react-native-svg';
import SvgUri from 'react-native-svg-uri';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import AppStyles from 'app/config/styles';
import images from 'app/config/images';

import dictionary from 'app/utils/Dictionaries';
import dictionariesConfig from 'app/constants/dictionariesConfig';
import styles from './styles';

class StatisticsView extends Component {
    state = {
      statisticsEntries: [],
    }

    componentWillUnmount() {
      console.log('unmounting statistics');
      removeAndroidBackButtonHandler();
    }

    async componentDidMount() {
      const { languagePack } = this.props;

      handleAndroidBackButton(() => {
        console.log('back');
        this.props.navigation.navigate('Home');
        console.log('clearing');
      });

      const statisticsEntries = [
        ['Current dictionary', dictionariesConfig.DICTIONARIES[languagePack].displayName],
        ['Total words', dictionariesConfig.DICTIONARIES[languagePack].entriesCount],
        ['Level 0', await dictionary.countWords({ srsStatus: 0 })],
        ['Level 1', await dictionary.countWords({ srsStatus: 1 })],
        ['Level 2', await dictionary.countWords({ srsStatus: 2 })],
        ['Level 3', await dictionary.countWords({ srsStatus: 3 })],
        ['Level 4', await dictionary.countWords({ srsStatus: 4 })],
      ];

      this.setState({ statisticsEntries });
    }

    render() {
      const {
        rows,
        cols,
        practiceBothway,
        languagePack,
      } = this.props;

      const { statisticsEntries } = this.state;

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
                fill="#66CCFF"
                svgXmlData={images.icons.times}
              />
            </TouchableOpacity>
          </View>
          <ScrollView style={[styles.container, styles.body]}>
            <View style={[styles.container, styles.body_item]}>
              {statisticsEntries.map(([displayName, value], itemIndex) => (
                <View key={itemIndex}>
                  <View style={styles.container_space_between}>
                    <Text style={styles.body_item_text}>
                      {displayName}
:
                    </Text>
                    <Text style={styles.body_item_text}>
                      {value}
                    </Text>
                  </View>
                  {itemIndex < statisticsEntries.length - 1 && <View style={styles.hairline} />}
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={styles.footer} />
        </View>
      );
    }
}

export default StatisticsView;
