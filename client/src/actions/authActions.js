import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  LOADING,
  CLEAR_ERRORS
} from '../utils/types';

export const setLoading = () => {
  return async function(dispatch) {
    dispatch({
      type: LOADING
    })
  }
}

export const loadUser = () => {
  return async function (dispatch){
    setLoading();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/auth', {
        headers: {
          'x-auth-token': token
        }
      });

      const data = await response.json();

      if (!response.ok) // or check for response.status
        throw new Error(data.msg);

      dispatch({
        type: USER_LOADED,
        payload: data
      });
    } catch(err) {
      console.dir(err);
      dispatch({
        type: AUTH_ERROR,
        payload: err.message
      });
    }
  }
}

export const register = (user) => {
  return async function (dispatch) {
    setLoading();
    try {
      const response = await fetch('/api/v1/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) // or check for response.status
        throw new Error(data.msg);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data
      });

    } catch(err) {
      console.dir(err);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.message
      })
    }
  }
}

export const login = (user) => {
  return async function (dispatch){
    setLoading();
    try {
      const response = await fetch('/api/v1/auth', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) // or check for response.status
        throw new Error(data.msg);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data
      });

    } catch(err) {
      console.dir(err);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.message
      })
    }
  }
}

export const logout = () => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT
    })
  }
}

export const clearErrors = () => {
  return function (dispatch) {
    dispatch({
      type: CLEAR_ERRORS
    })
  }
}

