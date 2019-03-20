import {SET_APP_LIST, SET_GUEST_APP_LIST} from '../actions/types';

import isEmpty from '../utils/is-empty';

const initState = {
    appList: [],
    guestList: [],
};

export default (state = initState, {type, payload}) => {
    switch(type){
        case SET_APP_LIST:
            return{
                ...state,
                appList: payload,
            }
        case SET_GUEST_APP_LIST:
            return {
                ...state,
                guestList: payload,
            }
        default: 
            return state;
    }
}
