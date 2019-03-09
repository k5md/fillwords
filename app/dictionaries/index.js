/* eslint camelcase: 0 global-require: 0 */

export default (dictionaryName) => {
  switch (dictionaryName) {
    case 'eng_rus':
      return require('./eng_rus');
    case 'rus_eng':
      return require('./rus_eng');
    case 'deu_ita':
      return require('./deu_ita');
    case 'eng_ita':
      return require('./eng_ita');
    case 'ita_eng':
      return require('./ita_eng');
    case 'eng_spa':
      return require('./eng_spa');
    case 'spa_eng':
      return require('./spa_eng');
    default:
      return [];
  }
};
