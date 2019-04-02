// reducers/index.js
import { combineReducers } from 'redux';
import messages from './messages';
import downloader from './downloader';

export default combineReducers({
  messages,
  downloader
});