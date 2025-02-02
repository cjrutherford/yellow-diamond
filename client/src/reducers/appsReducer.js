import {
  SET_APP_LIST,
  SET_GUEST_APP_LIST,
  APPLICATION_UPDATED,
  APP_SELECTED,
} from '../actions/types';

import isEmpty from '../utils/is-empty';

const initState = {
  appList: [],
  guestList: [],
  selectedApp: {},
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case SET_APP_LIST:
      return {
        ...state,
        appList: payload,
      };
    case SET_GUEST_APP_LIST:
      return {
        ...state,
        guestList: payload,
      };
    case APPLICATION_UPDATED:
      return {
        ...state,
        appList: [...state.appList, payload],
      };
    case APP_SELECTED:
      return {
        ...state,
        selectedApp: payload,
      };
    default:
      return state;
  }
};
