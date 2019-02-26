import SQLite from 'react-native-sqlite-storage';
import dictionariesConfig from 'app/constants/dictionariesConfig';
import configureStore from 'app/store/configureStore';
import dictionaries from 'app/dictionaries';

SQLite.DEBUG(false);
SQLite.enablePromise(true);

class Dictionaries {
  static instance;

  constructor(){
    if(this.instance){
      return this.instance;
    }

    this.instance = this;
    this.storage = SQLite.openDatabase({ name: dictionariesConfig.DB_NAME });
    this.dictionaryName = configureStore().store.getState().optionsReducer.languagePack;
  }

  async prepopulate() {
    const dictionaryName = this.dictionaryName;
    const db = await this.storage;
    const countResults = await db.executeSql(`SELECT COUNT(*) FROM ${dictionaryName}`, []);
    const count = Object.values(countResults[0].rows.item(0))[0];

    console.log('number of entries in', dictionaryName, count);

    if (count !== dictionariesConfig[dictionaryName].entriesCount) {
      const dictionary = dictionaries[dictionaryName];

      const fields = [
        [ 'word', 'TEXT'],
        [ 'translation', 'TEXT' ],
        [ 'detailedTranslation', 'TEXT' ],
        [ 'wordLength', 'INTEGER' ],
        [ 'translationLength', 'INTEGER' ],
        [ 'isWordComposite', 'BOOLEAN' ],
        [ 'isTranslationComposite', 'BOOLEAN' ],
        [ 'srsStatus', 'INTEGER' ], 
        [ 'lastReviewed', 'INTEGER' ], // Unix Time Stamp
      ];

      await this.storage.executeSql(`DROP TABLE IF EXISTS ${dictionaryName};`);
      await this.storage.executeSql(`CREATE TABLE ${dictionaryName}(${fields.map(entry => entry.join(' ')).join(',')});",`);
  
      console.log(dictionary);
      /*
      const insertTemplate = ()  "INSERT INTO ${dictionaryName} VALUES();",
      for (let i = 0; i < d.length; i += 500) {
        await db.sqlBatch(en_ru.default.slice(i, i + 500))
      } */
    }
  }

  switchDictionary() {

  }

  getWords() {
    //const results = await db.executeSql(`SELECT * FROM en_ru WHERE wordLength = ${chain.length} ORDER BY RANDOM() LIMIT 1`, []);
  }

  countWords() {}

  updateSRSStatus() {}
}

const dictionary = new Dictionaries();
dictionary.prepopulate();
 
export default dictionary;
