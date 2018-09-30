import {URL_INPUT_TEXT} from '../constants';

const changeUrlInput = ev => ({type: URL_INPUT_TEXT , payload: ev.target.value});


export {
    changeUrlInput
}