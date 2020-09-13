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

const initialState = {
  flats: null,
  current: null,
  error: null,
  loading: false,
  filteredFlats: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_FLATS:
      return {
        ...state,
        flats: action.payload,
        loading: false
      }
    case ADD_FLAT:
      return {
        ...state,
        flats: [action.payload, ...state.flats],
        loading: false
      }
    case UPDATE_FLAT:
      const updatedFlat = action.payload;
      return {
        ...state,
        flats: state.flats.map(flat => flat._id === updatedFlat._id ? updatedFlat : flat),
        loading: false
      }
    case DELETE_FLAT:
      return {
        ...state,
        flats: state.flats.filter(flat => flat._id !== action.payload),
        loading: false
      }
    case FLAT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
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