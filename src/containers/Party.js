import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCharacters } from '../actions/characters';

import Party from '../components/Party';

import { campaignState } from './Campaign'

function mapStateToProps(state) {
  const campaignStateFields = campaignState(state);

  return {
    ...campaignStateFields,
    characters: state.characters.list,
    sessions: state.sessions.list,
    sessionsIndex: state.sessions.index
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCharacters: fetchCharacters
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Party);
