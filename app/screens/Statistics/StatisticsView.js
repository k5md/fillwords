import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { SvgUri } from 'react-native-svg';
import _ from 'lodash';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../../utils/androidBackButton';
import images from '../../config/images';
import dictionary from '../../utils/Dictionaries';
import dictionariesConfig from '../../config/dictionaries';
import { translate } from '../../localizations';
import styles from './styles';

class StatisticsView extends Component {
    state = {
      statisticsEntries: [],
    }

    async componentDidMount() {
      const {
        languagePack,
        navigation,
      } = this.props;

      handleAndroidBackButton(() => {
        // console.log('back');
        navigation.navigate('Home');
        // console.log('clearing');
      });

      const statisticsEntries = [
        [translate('dictionary'), dictionariesConfig.DICTIONARIES[languagePack].displayName],
        [translate('totalWords'), await dictionary.countWords({ 1: 1 })],
        [`${translate('level')} 0`, await dictionary.countWords({ srsStatus: 0 })],
        [`${translate('level')} 1`, await dictionary.countWords({ srsStatus: 1 })],
        [`${translate('level')} 2`, await dictionary.countWords({ srsStatus: 2 })],
        [`${translate('level')} 3`, await dictionary.countWords({ srsStatus: 3 })],
        [`${translate('level')} 4`, await dictionary.countWords({ srsStatus: 4 })],
      ];

      this.setState({ statisticsEntries });
    }

    componentWillUnmount() {
      // console.log('unmounting statistics');
      removeAndroidBackButtonHandler();
    }

    render() {
      const { navigation } = this.props;
      const { statisticsEntries } = this.state;

      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.header_item}>
              <Text style={styles.header_text}>{translate('statistics')}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
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
                <View key={_.uniqueId()}>
                  <View style={styles.container_space_between}>
                    <View style={styles.container}>
                      <Text style={styles.body_item_text}>
                        {displayName}
                        :
                      </Text>
                    </View>
                    <View style={[styles.container, styles.flow_right]}>
                      <Text style={styles.body_item_text} numberOfLines={1}>
                        {value}
                      </Text>
                    </View>
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

StatisticsView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  languagePack: PropTypes.string.isRequired,
};

export default StatisticsView;
