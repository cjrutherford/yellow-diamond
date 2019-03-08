import {combineReducers} from 'redux';

import authReducer from './authReducer';
import messageReducer from './messageReducer';
import appsReducer from './appsReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    auth: authReducer,
    messages: messageReducer,
    apps: appsReducer,
    users: usersReducer
});