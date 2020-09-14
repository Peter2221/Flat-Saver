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

export const setLoading = (dispatch) => {
  dispatch({
    type: LOADING
  })
}

export const setCurrent = (flat) => {
  return function (dispatch) {
    dispatch({
      type: SET_CURRENT,
      payload: flat
    })
  }
}

export const clearCurrent = () => {
  return function (dispatch) {
    dispatch({
      type: CLEAR_CURRENT
    })
  }
}

export const getFlats = () => {
  return async function (dispatch) {
    setLoading(dispatch);
    try {
      const response = await fetch('/api/v1/flats', {
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
    setLoading(dispatch);
    try {
      const response = await fetch('/api/v1/flats', {
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

export const updateFlat = (flat) => {
  return async function(dispatch) {
    const flatId = flat._id;
    setLoading(dispatch);
    try {
      const response = await fetch(`/api/v1/flats/${flatId}`, {
        method: 'PUT',
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
        type: UPDATE_FLAT,
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
    setLoading(dispatch);
    try {
      const response = await fetch(`/api/v1/flats/${id}`, {
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
        type: DELETE_FLAT,
        payload: id
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