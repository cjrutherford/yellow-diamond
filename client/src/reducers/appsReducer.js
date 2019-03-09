import { SET_MESSAGE, ACK_MESSAGE } from '../actions/types';

/**
 * Message Schema:
 * {
 *  id: number
 *  text: 'text of the message'
 *  ack: (default false)
 * }
 */

const initState = {
	apps: [],
	selectedApp: {},
};

export default (state = initState, { type, payload }) => {
	switch (type) {
	case SET_MESSAGE:
		return {
			...state,
			messages: state.messages.push(payload),
		};
	case ACK_MESSAGE:
		return {
			...state,
			messages: state.messages.map((content, i) => {
				if (content.id === payload.id) content.ack = !content.ack;
			}),
		};
	default:
		return state;
	}
};
