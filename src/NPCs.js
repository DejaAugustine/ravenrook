import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { parseWPResponse } from './utils.js';

import './NPCs.css';

class NPCs extends Component {

  parseCampaign(props) {
    console.log("NPC:parseCampaign", props);
    this.setState({
      campaign: props.campaign,
      path: props.path
    });

    if(props.campaign) {
      fetch("https://api.therookandtheraven.com/wp-json/wp/v2/character?per_page=100&filter[orderby]=title&order=asc&categories_exclude=10&categories=" + props.campaign.id)
        .then(res => res.json())
        .then(res => parseWPResponse(res))
        .then(res => {
          this.setState({
            characters: res
          });

          var index = this.state.index || {};

          for(var i=0;i<res.length;i++) {
            var character = res[i];
            index[character.id] = i;
          };

          this.setState({
            index: index
          });
        });
    }
  }

  parseSession(props) {
    console.log("NPC:parseSession", props);
    this.setState({
      session: props.session
    });

    if(props.session) {
      var ids = props.session.acf.npcs.map(function(character, index){
        return character.ID;
      });

      this.setState({
        present: ids
      });
    }
  }

  componentWillMount() {
    this.setState({
      characters: [],
      present: []
    });
  }

  componentWillReceiveProps(newProps) {
    if(!this.state.campaign || this.state.campaign !== newProps.campaign) {
      this.parseCampaign(newProps);
    }

    if(!this.state.session || this.state.session !== newProps.session) {
      this.parseSession(newProps);
    }
  }

  render() {
    if(!this.state.index) return(null);

    const state = this.state;
    console.log("NPC:render", this.state.index, this.state.present, this.state.characters);
    const npcList = state.present.map(function(characterId, index){
      const character = state.characters[state.index[characterId]];
      return (
        <Link key={index} to={state.path + '/characters/' + character.slug} className="npc" style={{backgroundImage: 'url(' + character.acf.token + ')'}}>
          <p>
            {character.acf.short_name || character.title.rendered} - {character.acf.race_class}<br />
            {character.acf.summary}
          </p>
        </Link>
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
