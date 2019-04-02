import { URL_INPUT_TEXT } from '../constants';

export default (uiState = {}, action) => {
    switch (action.type) {
        case URL_INPUT_TEXT:
            return { ...uiState, urlInputText: action.payload };
        default:
            return uiState;
    }
}