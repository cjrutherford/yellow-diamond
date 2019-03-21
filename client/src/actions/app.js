import { SET_GUEST_APP_LIST, SET_APP_LIST, GET_ERRORS } from './types';
import axios from 'axios';

export const getGuestApps = () => dispatch => {
    axios.get('http://localhost:3201/application/guest/list').then(res => {
        dispatch({
            type: SET_GUEST_APP_LIST,
            payload: res.data,
        });
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    })
}

export const getAppsList = () => dispatch => {
    axios.get('http://localhost:3201/application/').then(res => {
        dispatch({
            type: SET_APP_LIST,
            payload: res.data,
        });
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err,
        });
    });

}