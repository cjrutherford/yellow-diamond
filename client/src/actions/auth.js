import {GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => (dispatch) => {
    axios.post("/users/regiser", userData).then(res => history.push('/login')).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
};

export const loginUser = userData => dispatch => {
    axios.post('/users/login', userData).then(res => {
        const {token} = res.data;
        localStorage.setItem("yellowDiamondToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    });
};

export const setCurrentUser = userData => {
    return {
        type: SET_CURRENT_USER, 
        payload: userData
    };
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('yellowDiamondToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};