import { combineReducers } from 'redux';
import flatReducer from './flatReducer';
import authReducer from './authReducer';

export default combineReducers({
  flat: flatReducer,
  auth: authReducer
});
