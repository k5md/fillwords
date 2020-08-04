/* eslint no-underscore-dangle: ["error", { "allow": ["_dictionaryName"] }] */

import SQLite from 'react-native-sqlite-storage';
import dictionariesConfig from '../config/dictionaries';
import configureStore from '../store/configureStore';
import dictionaries from '../dictionaries';
import observeStore from './Observer';
import { dbReady, dbNotReady } from '../actions/optionsActions';

SQLite.DEBUG(__DEV__);
SQLite.enablePromise(true);

const { store } = configureStore();

const fields = [
  ['word', 'TEXT'],
  ['translation', 'TEXT'],
  ['wordLength', 'INTEGER'],
  ['srsStatus', 'INTEGER'],
  ['lastReviewed', 'INTEGER'], // Unix Time Stamp
];

class Dictionaries {
  static instance;

  constructor() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = this;
    this.storage = SQLite.openDatabase({ name: dictionariesConfig.DB_NAME });
    this._dictionaryName = null;
  }

  get dictionaryName() {
    return this._dictionaryName;
  }

  set dictionaryName(newDictionaryName) {
    this._dictionaryName = newDictionaryName;
    this.initialize();
  }

  async initialize() {
    store.dispatch(dbReady());

    const { dictionaryName } = this;
    const db = await this.storage;

    try {
      const countResults = await db.executeSql(
        `SELECT COUNT(*) FROM ${dictionaryName}`,
        [],
      );
      const count = Object.values(countResults[0].rows.item(0))[0];

      if (
        count !== dictionariesConfig.DICTIONARIES[dictionaryName].entriesCount
      ) {
        throw new Error(
          'entries count mismatch',
          count,
          dictionariesConfig.DICTIONARIES[dictionaryName].entriesCount,
        );
      }
    } catch (e) {
      store.dispatch(dbNotReady());
      const dictionary = dictionaries(dictionaryName);

      await db.executeSql(`DROP TABLE IF EXISTS ${dictionaryName};`);
      await db.executeSql(
        `CREATE TABLE IF NOT EXISTS ${dictionaryName}(${fields
          .map(entry => entry.join(' '))
          .join(',')});",`,
      );

      const defaultSrsStatus = 0;
      const defaultLastReviewed = Date.now();
      const valuesTemplate = `(?,?,?,${defaultSrsStatus},${defaultLastReviewed})`;
      const insertTemplate = `INSERT INTO ${dictionaryName} VALUES ${valuesTemplate};`;

      const maxBatchSize = 500; // cordova-sqlite and it's derivatives crash the app if exceeded
      const transactions = [];
      for (let i = 0; i < dictionary.length; i += maxBatchSize) {
        const transaction = db.transaction(tx => {
          for (
            let j = 0;
            j < maxBatchSize && j + i < dictionary.length;
            j += 1
          ) {
            tx.executeSql(insertTemplate, dictionary[i + j]);
          }
        });
        transactions.push(transaction);
      }
      await Promise.all(transactions);
      // NOTE: consider search for not-composite words
      await db.executeSql(
        `CREATE INDEX IF NOT EXISTS idx_${dictionaryName}_wordLength ON ${dictionaryName} (wordLength)`,
      );
      store.dispatch(dbReady());
    }
  }

  // async switchDictionary(dictionaryName) {}

  async getWord(selector, order = 'RANDOM()', limit = 1) {
    const { dictionaryName } = this;
    const db = await this.storage;
    const specifier = Object.entries(selector)
      .map(pair => pair.join('='))
      .join(',');
    const results = await db.executeSql(
      `SELECT * FROM ${dictionaryName} WHERE ${specifier} ORDER BY ${order} LIMIT ${limit}`,
      [],
    );
    const entry = results[0].rows.item(0);

    return entry;
  }

  async countWords(selector) {
    const { dictionaryName } = this;
    const db = await this.storage;
    const specifier = Object.entries(selector)
      .map(pair => pair.join('='))
      .join(',');
    const countResults = await db.executeSql(
      `SELECT COUNT(*) FROM ${dictionaryName} WHERE ${specifier}`,
      [],
    );
    const count = Object.values(countResults[0].rows.item(0))[0];

    return count;
  }

  async updateWord(selector, update) {
    const { dictionaryName } = this;
    const db = await this.storage;
    const modifier = Object.entries(update)
      .map(pair => pair.join('='))
      .join(',');
    const specifier = Object.entries(selector)
      .map(([left, right]) => `${left}='${right}'`)
      .join(',');
    const results = await db.executeSql(
      `UPDATE ${dictionaryName} SET ${modifier} WHERE ${specifier}`,
      [],
    );

    return results;
  }

  async resetStatistics() {
    const { dictionaryName } = this;
    const db = await this.storage;
    const update = {
      lastReviewed: Date.now(),
      srsStatus: 0,
    };
    const modifier = Object.entries(update)
      .map(pair => pair.join('='))
      .join(',');
    const results = await db.executeSql(
      `UPDATE ${dictionaryName} SET ${modifier}`,
      [],
    );

    return results;
  }
}

const dictionary = new Dictionaries();

// subscribing to optionsReducer changes to update and reinitialize the dictionary storage

observeStore(
  store,
  state => state.optionsReducer.languagePack,
  newDictionaryName => {
    dictionary.dictionaryName = newDictionaryName;
  },
);

export default dictionary;
