import {URL_INPUT_TEXT} from '../constants';

const uiReducer = (uiState={}, action) => {
    switch(action.type) {
        case URL_INPUT_TEXT:
        return {...uiState, urlInputText: action.payload};
        default:
        return uiState;
    }
}

export default uiReducer;