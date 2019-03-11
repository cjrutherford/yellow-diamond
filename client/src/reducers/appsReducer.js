import {SET_CURRENT_USER} from '../actions/types';

import isEmpty from '../utils/is-empty';

const initState = {
    
};

export default (state = initState, {type, payload}) => {
    switch(type){
        case SET_CURRENT_USER:
            return{
                ...state,
                user: payload,
                isAuthenticated: !isEmpty(payload)
            }
        default: 
            return state;
    }
}
