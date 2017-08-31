import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCharacters } from '../actions/characters';

import Party from '../components/Party';

function mapStateToProps(state) {
  return {
    campaign: state.campaigns.active,
    characters: state.characters.list,
    session: state.sessions.active
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCharacters: fetchCharacters
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Party);
