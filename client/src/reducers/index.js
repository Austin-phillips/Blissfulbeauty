import { combineReducers } from 'redux';
import services from './services';
import flash from './flash';

const rootReducer = combineReducers({
  services,
  flash,
});

export default rootReducer;