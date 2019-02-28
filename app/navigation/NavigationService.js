/* eslint no-underscore-dangle: ["error", { "allow": ["_navigator"] }] */

import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function goBack(key) {
  _navigator.dispatch(
    NavigationActions.back({
      key,
    }),
  );
}

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
};
