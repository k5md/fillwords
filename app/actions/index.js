// export action creators
import * as navigationActions from './navigationActions';
import * as optionsActions from './optionsActions';
import * as gameActions from './gameActions';

const ActionCreators = Object.assign(
  {},
  navigationActions,
  optionsActions,
  gameActions,
);

export default ActionCreators;
