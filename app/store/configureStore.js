/* global __DEV__:true */

import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
// default: localStorage if web, AsyncStorage if react-native
import storage from 'redux-persist/es/storage';
// import AsyncStorage from '@react-native-community/async-storage';
import { createLogger } from 'redux-logger';

import rootReducers from '../reducers'; // where reducers is a object of reducers

const config = {
  key: 'root',
  storage, // : AsyncStorage,
  blacklist: ['nav', 'gameReducer'],
  debug: true, // to get useful logging
};

const middleware = [];


if (__DEV__) {
  middleware.push(createLogger());
}

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
const persistConfig = { enhancers };
const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {

});
const configureStore = () => ({ persistor, store });


export default configureStore;
