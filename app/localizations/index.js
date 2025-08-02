/* eslint global-require: 0 */

import * as RNLocalize from 'react-native-localize';

const translations = [
  {
    languageTag: 'de',
    displayName: 'Deutsch',
    translation: require('./de.json'),
  },
  {
    languageTag: 'en',
    displayName: 'English',
    translation: require('./en.json'),
  },
  // { languageTag: 'fr', displayName: 'Français', translation: require('./fr.json') },
  // { languageTag: 'ja', displayName: '日本語', translation: require('./ja.json') },
  {
    languageTag: 'ru',
    displayName: 'Русский',
    translation: require('./ru.json'),
  },
  // { languageTag: 'zh', displayName: '中文', translation: require('./zh.json') },
  // { languageTag: 'it', displayName: 'Italiano', translation: require('./it.json') },
  // { languageTag: 'pl', displayName: 'Polski', translation: require('./pl.json') },
];

const fallback = { languageTag: 'en', isRTL: false };
const { languageTag } =
  RNLocalize.findBestLanguageTag(
    translations.map(item => item.languageTag),
  ) || fallback;

const { translation } = translations.find(
  item => item.languageTag === languageTag,
);

const translate = string => translation[string];

export { translate, translations };
