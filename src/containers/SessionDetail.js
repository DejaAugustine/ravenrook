import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchSessions, selectSession } from '../actions/sessions';

import SessionDetail from '../components/SessionDetail';

function mapStateToProps(state) {
  return {
    campaign: state.campaigns.active,
    sessions: state.sessions.list,
    session: state.sessions.active,
    sessionSlug: state.sessions.activeKey
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSessions: fetchSessions,
    selectSession: selectSession
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionDetail);
