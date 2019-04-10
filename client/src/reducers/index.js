import { combineReducers } from 'redux';
import services from './services';
import flash from './flash';
import appointments from './appointments';
import user from './user';
import userAppointments from './userAppointments';
import images from './images';

const rootReducer = combineReducers({
  services,
  flash,
  appointments,
  user,
  userAppointments,
  images
});

export default rootReducer;