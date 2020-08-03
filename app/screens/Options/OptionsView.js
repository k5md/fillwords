/* eslint camelcase: ["error", {allow: ["^UNSAFE_"]}] */

import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  ScrollView,
  Picker,
  Slider,
  TouchableOpacity,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import PropTypes from 'prop-types';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../../utils/androidBackButton';
import images from '../../config/images';
import dictionariesConfig from '../../config/dictionaries';
import styles from './styles';
import { translate } from '../../localizations';
import dictionary from '../../utils/Dictionaries';
import HelpContainer from './HelpContainer';

class OptionsView extends Component {
  constructor(props) {
    super(props);

    const { rows, cols } = this.props;
    this.state = {
      rows,
      cols,
    };
  }

  componentDidMount() {
    handleAndroidBackButton(() => {
      const {
        showHelp,
        toggleShowHelp,
        navigation,
      } = this.props;

      if (showHelp) {
        toggleShowHelp();
      }
      navigation.navigate('Home');
    });
  }

  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { cols, rows } = nextProps;
    return { cols, rows };
  }

  render() {
    const {
      navigation,
      changeNumberCols,
      changeNumberRows,
      languagePack,
      setLanguagePack,
      toggleShowHelp,
    } = this.props;

    const {
      cols,
      rows,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header_item}>
            <Text style={styles.header_text}>{translate('options')}</Text>
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
            <Text style={styles.body_item_text}>
              {`${translate('numberOfRows')}: ${rows}`}
            </Text>
            <Slider
              step={1}
              minimumValue={5}
              maximumValue={10}
              minimumTrackTintColor="#66CCFF"
              thumbTintColor="#66CCFF"
              value={rows}
              onValueChange={value => this.setState({ rows: value })}
              onSlidingComplete={changeNumberRows}
            />
            <View style={styles.hairline} />
            <Text style={styles.body_item_text}>
              {`${translate('numberOfCols')}: ${cols}`}
            </Text>
            <Slider
              step={1}
              minimumValue={5}
              maximumValue={10}
              minimumTrackTintColor="#66CCFF"
              thumbTintColor="#66CCFF"
              value={cols}
              onValueChange={value => this.setState({ cols: value })}
              onSlidingComplete={changeNumberCols}
            />
          </View>
          <View style={[styles.container, styles.body_item]}>
            <Text style={styles.body_item_text}>
              {`${translate('selectLanguagePair')}:`}
            </Text>
            <Picker
              selectedValue={languagePack}
              onValueChange={dictionaryKey => setLanguagePack(dictionaryKey)}
            >
              {Object.keys(dictionariesConfig.DICTIONARIES).map(dictionaryKey => (
                <Picker.Item
                  key={dictionaryKey}
                  label={dictionariesConfig.DICTIONARIES[dictionaryKey].displayName}
                  value={dictionaryKey}
                  itemStyle={styles.body_item_text}
                />
              ))}
            </Picker>
          </View>
          <View style={[styles.container, styles.body]}>
            <TouchableOpacity
              onPress={() => toggleShowHelp()}
            >
              <View style={styles.body_item}>
                <Text style={styles.body_item_text}>
                  {translate('help')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.container, styles.body]}>
            <TouchableOpacity
              onPress={() => Alert.alert(
                translate('confirmResetStatistics'),
                translate('confirmResetStatisticsQuestion'),
                [
                  { text: translate('cancel'), style: 'cancel' },
                  { text: translate('ok'), onPress: () => dictionary.resetStatistics() },
                ],
              )}
            >
              <View style={styles.body_item}>
                <Text style={styles.body_item_text}>
                  {translate('confirmResetStatistics')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footer_text}>
            {`${translate('version')} 1.0`}
          </Text>
        </View>
        <HelpContainer />
      </View>
    );
  }
}

OptionsView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  languagePack: PropTypes.string.isRequired,
  changeNumberRows: PropTypes.func.isRequired,
  changeNumberCols: PropTypes.func.isRequired,
  setLanguagePack: PropTypes.func.isRequired,
  toggleShowHelp: PropTypes.func.isRequired,
  showHelp: PropTypes.bool.isRequired,
};

export default OptionsView;
