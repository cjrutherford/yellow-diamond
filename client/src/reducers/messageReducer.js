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
	messages: [],
};

export default (state = initState, { type, payload }) => {
	switch (type) {
	case SET_MESSAGE:
		return {
			...state,
			messages: state.messages.push(payload),
		};
	// case ACK_MESSAGE:
	// 	return {
	// 		...state,
	// 		messages: () => {
	// 			return state.messages.map((content, i) => {
	// 			if (content.id === payload.id) return content.ack = !content.ack;
	// 		})},
	// 	};
	default:
		return state;
	}
};
