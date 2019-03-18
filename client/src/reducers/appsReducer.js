import {SET_APP_LIST} from '../actions/types';

import isEmpty from '../utils/is-empty';

const initState = {
    appList: [],
};

export default (state = initState, {type, payload}) => {
    switch(type){
        case SET_APP_LIST:
            return{
                ...state,
                appList: payload,
            }
        default: 
            return state;
    }
}
