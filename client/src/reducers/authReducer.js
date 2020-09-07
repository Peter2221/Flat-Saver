// import types

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}