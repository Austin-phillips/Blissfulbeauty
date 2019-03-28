import { combineReducers } from 'redux';
import services from './services';
import flash from './flash';
import singleService from './singleService';
import appointments from './appointments';

const rootReducer = combineReducers({
  services,
  flash,
  singleService,
  appointments,
});

export default rootReducer;