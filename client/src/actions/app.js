import {
  SET_GUEST_APP_LIST,
  SET_APP_LIST,
  GET_ERRORS,
  APPLICATION_UPDATED,
  APP_SELECTED,
} from './types';
import axios from 'axios';

export const getGuestApps = () => dispatch => {
  axios
    .get('http://localhost:3201/application/guest/list')
    .then(res => {
      dispatch({
        type: SET_GUEST_APP_LIST,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
};

export const getAppsList = () => dispatch => {
  axios
    .get('http://localhost:3201/application/')
    .then(res => {
      dispatch({
        type: SET_APP_LIST,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
};

export const selectApplication = id => dispatch => {
  console.log('ID From Select Application: ' + id);
  axios
    .get(`http://localhost:3201/application/${id}`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: APP_SELECTED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
};

export const updateApplication = appData => dispatch => {
  axios
    .patch(`http://localhost:3201/application/${appData.id}`, appData)
    .then(res => {
      dispatch({
        type: APPLICATION_UPDATED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
};
