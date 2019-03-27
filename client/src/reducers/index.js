import { combineReducers } from 'redux';
import services from './services';
import flash from './flash';
import singleService from './singleService';

const rootReducer = combineReducers({
  services,
  flash,
  singleService,
});

export default rootReducer;