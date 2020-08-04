/* global __DEV__:true */

import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { createLogger } from 'redux-logger';

import rootReducers from '../reducers'; // where reducers is a object of reducers

const config = {
  key: 'not-root', // refer to redux-persist issue on rp converting arrays in root storage to plain objects
  storage: AsyncStorage,
  blacklist: ['nav', 'gameReducer'],
  debug: __DEV__,
};

const middleware = [];

if (__DEV__) {
  middleware.push(createLogger());
}

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
const persistConfig = { enhancers };
const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {});
const configureStore = () => ({ persistor, store });

export default configureStore;
