import { SET_CURRENT_USER, SET_USER_LIST } from '../actions/types';

/**
 * Message Schema:
 * {
 *  id: number
 *  text: 'text of the message'
 *  ack: (default false)
 * }
 */

const initState = {
	users: [],
	selectedUser: {},
};

export default (state = initState, { type, payload }) => {
	switch (type) {
	case SET_USER_LIST:
		return {
			...state,
			users: state.users.push(payload),
		};
	case SET_CURRENT_USER:
		return {
			...state,
			user: payload,
		};
	default:
		return state;
	}
};
