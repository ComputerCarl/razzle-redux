// reducers/index.js
import { combineReducers } from 'redux';
import messages from './messages';
import downloader from './downloader';

const rootReducer = combineReducers({
  messages,
  downloader
});

export default rootReducer;

