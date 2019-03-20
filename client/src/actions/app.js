import {SET_GUEST_APP_LIST, GET_ERRORS} from './types';
import axios from 'axios';

export const getApps = () => dispatch => {
    axios.get('http://localhost:3201/application/guest/list').then(res => {
        dispatch({
            type: SET_GUEST_APP_LIST,
            payload: res.data,
        });
    }).catch(err => {
        dispatch({
            type:GET_ERRORS,
            payload: err
        })
    })
}