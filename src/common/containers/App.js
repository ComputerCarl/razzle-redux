import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from './Main';
import * as downloaderActions from '../actions/downloader';
import * as messagesActions from '../actions/messages';

// only connect a portion of the state to the component
const mapStateToProps = state => ({
  messages: state.messages,
  downloader: state.downloader,
});

// instead of the entire state
// const mapStateToProps = state => state;

// https://github.com/reduxjs/redux/issues/363
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...messagesActions, ...downloaderActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);