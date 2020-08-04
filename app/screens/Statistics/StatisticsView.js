import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../../utils/androidBackButton';
import dictionary from '../../utils/Dictionaries';
import dictionariesConfig from '../../config/dictionaries';
import { translate } from '../../localizations';

import { StyleSheet } from 'react-native';
import AppStyles from '../../config/styles';
import { Footer, Header, Separator } from '../../elements';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  body: {
    backgroundColor: color.COLOR_GREYISH,
    flex: 1,
  },
  body_item: {
    backgroundColor: color.COLOR_WHITE,
    borderRadius: 5,
    margin: 20,
    padding: 10,
  },
  body_item_text: {
    fontFamily: 'Verdana',
    fontSize: fontSizes.FONT_SIZE_SMALL, // 20px was default
  },
  container: {
    flex: 1,
  },
  container_space_between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flow_right: {
    alignItems: 'flex-end',
  },
});

class StatisticsView extends Component {
  state = {
    statisticsEntries: [],
  };

  async componentDidMount() {
    const { languagePack, navigation } = this.props;

    handleAndroidBackButton(() => {
      // console.log('back');
      navigation.navigate('Home');
      // console.log('clearing');
    });

    const statisticsEntries = [
      [
        translate('dictionary'),
        dictionariesConfig.DICTIONARIES[languagePack].displayName,
      ],
      [translate('totalWords'), await dictionary.countWords({ 1: 1 })],
      [
        `${translate('level')} 0`,
        await dictionary.countWords({ srsStatus: 0 }),
      ],
      [
        `${translate('level')} 1`,
        await dictionary.countWords({ srsStatus: 1 }),
      ],
      [
        `${translate('level')} 2`,
        await dictionary.countWords({ srsStatus: 2 }),
      ],
      [
        `${translate('level')} 3`,
        await dictionary.countWords({ srsStatus: 3 }),
      ],
      [
        `${translate('level')} 4`,
        await dictionary.countWords({ srsStatus: 4 }),
      ],
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
        <Header
          title={translate('statistics')}
          onClose={() => navigation.navigate('Home')}
        />
        <ScrollView style={[styles.container, styles.body]}>
          <View style={[styles.container, styles.body_item]}>
            {statisticsEntries.map(([displayName, value], itemIndex) => (
              <View key={_.uniqueId()}>
                <View style={styles.container_space_between}>
                  <View style={styles.container}>
                    <Text style={styles.body_item_text}>{displayName}:</Text>
                  </View>
                  <View style={[styles.container, styles.flow_right]}>
                    <Text style={styles.body_item_text} numberOfLines={1}>
                      {value}
                    </Text>
                  </View>
                </View>
                {itemIndex < statisticsEntries.length - 1 && <Separator />}
              </View>
            ))}
          </View>
        </ScrollView>
        <Footer />
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
