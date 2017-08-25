import React, { Component } from 'react';
import parseWPResponse from './utils.js';

class NPCs extends Component {
  componentWillMount() {
    this.setState({
      characters: [],
      present: []
    });
  }

  componentWillReceiveProps(props) {

    if(props.campaign) {
      fetch("http://api.therookandtheraven.com/wp-json/wp/v2/character?filter[orderby]=title&order=asc&categories_exclude=10&categories=" + props.campaign.id)
        .then(res => res.json())
        .then(res => parseWPResponse(res))
        .then(res => {
          this.setState({
            characters: res
          });
        });
    }

    if(props.session) {
      var ids = props.session.acf.npcs.map(function(character, index){
        return character.ID;
      });

      this.setState({
        present: ids
      });
    }
  }

  render() {
    const state = this.state;
    const npcList = this.state.characters.map(function(character, index){
      const present = state.present.length > 0 ? state.present.includes(character.id) : true;
      if(present) {
        return (
          <a href={'/characters/' + character.slug} className="npc" style={{backgroundImage: 'url(' + character.acf.token + ')'}}>
            <p>
              {character.acf.short_name || character.title} - {character.acf.race_class}<br />
              {character.acf.summary}
            </p>
          </a>
        );
      }
    });

    return (
      <aside>
        <h4>Notable Guests &amp; NPCs</h4>

      </aside>
    );
  }
};

export default NPCs;
