import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Navigator from './navigation';
import configureStore from './store/configureStore';
import { MobileAds } from 'yandex-mobile-ads';

const { persistor, store } = configureStore();

const Entrypoint = () => {
  React.useEffect(() => {
      (async () => {
          // Configure the user privacy data policy before init sdk
          await MobileAds.initialize();
      })();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
};

export default Entrypoint;
