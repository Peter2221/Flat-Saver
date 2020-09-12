import {
  GET_FLATS,
  ADD_FLAT,
  UPDATE_FLAT,
  DELETE_FLAT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FLAT_ERROR,
  LOADING
} from '../utils/types';

export const setLoading = () => {
  return function (dispatch) {
    dispatch({
      type: LOADING
    })
  }
}

export const getFlats = () => {
  return async function (dispatch) {
    setLoading();
    try {
      const response = await fetch('http://localhost:5000/api/v1/flats', {
        method: 'GET',
        headers: {
          'x-auth-token': localStorage.getItem('token') 
        }
      });

      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.msg);
      }

      dispatch({
        type: GET_FLATS,
        payload: data
      })

    } catch(err) {
      console.log(err);
      dispatch({
        type: FLAT_ERROR,
        payload: err.message
      })
    }
  }
}

export const addFlat = (flat) => {
  return async function(dispatch) {
    setLoading();
    try {
      const response = await fetch('http://localhost:5000/api/v1/flats', {
        method: 'POST',
        body: JSON.stringify(flat),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') 
        }
      });

      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.msg);
      };

      dispatch({
        type: ADD_FLAT,
        payload: data
      });
    } catch(err) {
      console.log(err);
      dispatch({
        type: FLAT_ERROR,
        payload: err.message
      });
    }
  }
}

export const deleteFlat = (id) => {
  return async function(dispatch) {
    setLoading();
    try {
      const response = await fetch(`http://localhost:5000/api/v1/flats/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': localStorage.getItem('token') 
        }
      });

      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.msg);
      };

      dispatch({
        type: DELETE_FLAT
      });
    } catch(err) {
      console.log(err);
      dispatch({
        type: FLAT_ERROR,
        payload: err.message
      });
    }
  }
}