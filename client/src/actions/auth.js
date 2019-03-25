import {GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => (dispatch) => {
    axios.post("http://localhost:3201/users/register", userData).then(res => history.push('/login')).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
};

export const loginUser = (userData, history) => dispatch => {
    axios.post('http://localhost:3201/users/login', userData).then(res => {
        const {token} = res.data;
        localStorage.setItem("yellowDiamondToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        history.push('/');
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