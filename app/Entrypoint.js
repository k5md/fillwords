import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Navigator from './navigation';
import configureStore from './store/configureStore';

const { persistor, store } = configureStore();

const Entrypoint = () => (
  <Provider store={store}>
    <PersistGate
      loading={<ActivityIndicator />}
      persistor={persistor}
    >
      <Navigator />
    </PersistGate>
  </Provider>
);

export default Entrypoint;
