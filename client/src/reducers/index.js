import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth'
import profile from './profile'
import post from './post'
import announcement from './announcement'
export default combineReducers({
  alert,
  auth,
  profile,
  post,
  announcement
});