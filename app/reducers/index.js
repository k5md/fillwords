import * as homeReducer from './homeReducer';
import * as gameReducer from './gameReducer';
import * as optionsReducer from './optionsReducer';

export default Object.assign(homeReducer, gameReducer, optionsReducer);
