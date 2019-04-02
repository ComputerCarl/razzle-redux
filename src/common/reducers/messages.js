import { ADD_MESSAGE } from '../constants';

// when using multiple reducers, the "state" is only a slice of the messagesState
// so I do not return { ...state, messages: concat(state.messages, ['new']) };
// just the array that is messages
export default (messagesState = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...messagesState, action.payload];
    default:
      return messagesState;
  }
};