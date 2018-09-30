import { ADD_MESSAGE } from '../constants';

// {
//     to: 1, // 0 = all, 1 = admins, n = userID
//     level: 'info',
//     text: `pushed button`
// }

const addMessage = (message) => ({
    type: ADD_MESSAGE,
    payload: {
        ...message,
        readableTime: new Date().toLocaleString(),
        timestamp: Date.now()
    }
});

export {
    addMessage
}