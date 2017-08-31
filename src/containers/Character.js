import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCharacters, selectCharacter } from '../actions/characters';
import Character from '../components/Character';

function mapStateToProps(state) {
  return {
    campaign: state.campaigns.active,
    characters: state.characters.list,
    characterSlug: state.characters.activeKey,
    character: state.characters.active
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCharacters: fetchCharacters,
    selectCharacter: selectCharacter
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Character);
