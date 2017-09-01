import React, { Component } from 'react';
import parseWPResponse from '../utils';

import './NPCs.css';

class NPCs extends Component {

  render() {
    console.log("NPCs:render", this.props);
    const characterList = this.props.characters || {};
    const session = this.props.session;

    if(!session.acf) return(null);

    const sessionNPCIds = session.acf.npcs.map(function(character, index){
      return character.ID;
    });

    const npcList = Object.values(characterList).map(function(character, index){
      if(!character.categories.includes(11) || !sessionNPCIds.includes(character.id)) {
        return (null);
      }

      return (
        <div key={index} className="npc" style={{backgroundImage: 'url(' + character.acf.token + ')'}}>
          <p>
            {character.acf.short_name || character.title.rendered} - {character.acf.race_class}<br />
            {character.acf.summary}
          </p>
        </div>
      );
    });

    return (
      <aside>
        <h4>Notable Guests &amp; NPCs</h4>
        {npcList}
      </aside>
    );
  }
};

export default NPCs;
