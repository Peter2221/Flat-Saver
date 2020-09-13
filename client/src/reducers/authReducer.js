import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  AUTH_ERROR,
  LOADING,
  USER_LOADED
} from '../utils/types';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        error: null,
        loading: false
      }
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
        loading: false
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    case LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}