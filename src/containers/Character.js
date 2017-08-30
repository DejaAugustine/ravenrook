import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectCharacter } from '../actions/characters';
import Character from '../components/Character';

function mapStateToProps(state) {
  var character;
  if(state.characters.index) {
    character = state.characters.list[state.characters.index[state.characters.activeSlug]];
  }

  return {
    characterSlug: state.characters.activeSlug,
    character: character
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectCharacter: selectCharacter
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Character);
