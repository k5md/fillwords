import SQLite from 'react-native-sqlite-storage';
import dictionariesConfig from '../config/dictionaries';
import configureStore from '../store/configureStore';
import dictionaries from '../dictionaries';

SQLite.DEBUG(false);
SQLite.enablePromise(true);

const fields = [
  ['word', 'TEXT'],
  ['translation', 'TEXT'],
  ['detailedTranslation', 'TEXT'],
  ['wordLength', 'INTEGER'],
  ['translationLength', 'INTEGER'],
  ['isWordComposite', 'BOOLEAN'],
  ['isTranslationComposite', 'BOOLEAN'],
  ['srsStatus', 'INTEGER'],
  ['srsStatusReversed', 'INTEGER'],
  ['lastReviewed', 'INTEGER'], // Unix Time Stamp
  ['lastReviewedReversed', 'INTEGER'], // Unix Time Stamp
];

class Dictionaries {
  static instance;

  constructor() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = this;
    this.storage = SQLite.openDatabase({ name: dictionariesConfig.DB_NAME });
    this.dictionaryName = configureStore().store.getState().optionsReducer.languagePack;
  }

  async prepopulate() {
    const { dictionaryName } = this;
    const db = await this.storage;
    // console.log(`prepopulating ${dictionaryName}`);
    try {
      const countResults = await db.executeSql(`SELECT COUNT(*) FROM ${dictionaryName}`, []);
      const count = Object.values(countResults[0].rows.item(0))[0];
      // console.log('number of entries in', dictionaryName, count);
      if (count !== dictionariesConfig.DICTIONARIES[dictionaryName].entriesCount) {
        throw new Error('entries count mismatch');
      }
    } catch (e) {
      const dictionary = dictionaries[dictionaryName];

      await db.executeSql(`DROP TABLE IF EXISTS ${dictionaryName};`);
      await db.executeSql(`CREATE TABLE IF NOT EXISTS ${dictionaryName}(${fields.map(entry => entry.join(' ')).join(',')});",`);

      const valuesTemplate = '(?,?,?,?,?,?,?,?,?,?,?)';
      const insertTemplate = `INSERT INTO ${dictionaryName} VALUES ${valuesTemplate};`;

      const maxBatchSize = 500; // cordova-sqlite and it's derivatives crash the app if exceeded
      const transactions = [];
      for (let i = 0; i < dictionary.length; i += maxBatchSize) {
        const transaction = db.transaction((tx) => {
          for (let j = 0; j < maxBatchSize && j + i < dictionary.length; j += 1) {
            tx.executeSql(insertTemplate, dictionary[i + j]);
          }
        });
        transactions.push(transaction);
      }
      await Promise.all(transactions);
      // NOTE: consider search for not-composite words
      await db.executeSql(`CREATE INDEX IF NOT EXISTS idx_${dictionaryName}_wordLength ON ${dictionaryName} (wordLength)`);
      await db.executeSql(`CREATE INDEX IF NOT EXISTS idx_${dictionaryName}_translationLength ON ${dictionaryName} (translationLength)`);
    }
  }

  // async switchDictionary(dictionaryName) {}

  async getWord(selector, order = 'RANDOM()', limit = 1) {
    const { dictionaryName } = this;
    const db = await this.storage;
    const specifier = Object.entries(selector).map(pair => pair.join('=')).join(',');
    const results = await db.executeSql(`SELECT * FROM ${dictionaryName} WHERE ${specifier} ORDER BY ${order} LIMIT ${limit}`, []);
    const entry = results[0].rows.item(0);

    return entry;
  }

  async countWords(selector) {
    const { dictionaryName } = this;
    const db = await this.storage;
    const specifier = Object.entries(selector).map(pair => pair.join('=')).join(',');
    const countResults = await db.executeSql(`SELECT COUNT(*) FROM ${dictionaryName} WHERE ${specifier}`, []);
    const count = Object.values(countResults[0].rows.item(0))[0];

    return count;
  }

  async updateWord(selector, update) {
    const { dictionaryName } = this;
    const db = await this.storage;
    const modifier = Object.entries(update).map(pair => pair.join('=')).join(',');
    const specifier = Object.entries(selector).map(pair => pair.join('=')).join(',');
    const results = await db.executeSql(`UPDATE ${dictionaryName} SET ${modifier} WHERE ${specifier}`, []);

    return results;
  }
}

const dictionary = new Dictionaries();
dictionary.prepopulate();

export default dictionary;
