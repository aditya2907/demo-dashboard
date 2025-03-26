// src/actions/dataActions.js
import axios from 'axios';
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from './actionTypes';

// Action to request data
const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

// Action when data is successfully fetched
const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

// Action when an error occurs while fetching data
const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

// Thunk action to fetch data from backend
export const fetchData = () => {
  return async (dispatch, getState) => {
    // Check if data already exists in the store
    const { data } = getState().data;
    if (data && data.length > 0) {
      // If data is already available, do not fetch again
      return Promise.resolve();
    }

    dispatch(fetchDataRequest());
    try {
      const response = await axios.get('https://api.example.com/data');
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};