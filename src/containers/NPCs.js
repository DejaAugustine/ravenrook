import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCharacters, selectCharacter } from '../actions/characters';
import NPCs from '../components/NPCs';

function mapStateToProps(state) {
  return {
    session: state.sessions.active,
    characters: state.characters.list
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCharacters: fetchCharacters,
    selectCharacter: selectCharacter
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NPCs);
