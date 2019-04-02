import { combineReducers } from 'redux';
import services from './services';
import flash from './flash';
import appointments from './appointments';
import user from './user';

const rootReducer = combineReducers({
  services,
  flash,
  appointments,
  user,
});

export default rootReducer;