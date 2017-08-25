import React, { Component } from 'react';
import parseWPResponse from './utils.js';

import './Party.css';

class Party extends Component {
  componentWillMount() {
    this.setState({
      characters: [],
      present: []
    });
  }

  componentWillReceiveProps(props) {
    if(props === this.props)
      return;
      
    if(props.campaign) {
      fetch("http://api.therookandtheraven.com/wp-json/wp/v2/character?filter[orderby]=title&order=asc&categories_exclude=11&categories=" + props.campaign.id)
        .then(res => res.json())
        .then(res => parseWPResponse(res))
        .then(res => {
          this.setState({
            characters: res
          });
        });
    }

    if(props.session) {
      var ids = props.session.acf.characters.map(function(character, index){
        return character.ID;
      });

      this.setState({
        present: ids
      });
    }
  }

  render() {
    const state = this.state;
    const partyList = this.state.characters.map(function(character, index){
      const present = state.present.length > 0 ? state.present.includes(character.id) : true;
      var classes = ["menu-item", "character"];
      if(!present) {
        classes.push("absent");
      }

      return <li key={index} className={classes.join(' ')} style={{backgroundImage: 'url(' + character.acf.token + ')'}}><a href={'/characters/' + character.slug}><span>{character.acf.short_name || character.title.rendered}</span></a></li>
    });

    return (
      <ul className="menu cast-list">
        {partyList}
      </ul>
    );
  }
};

export default Party;
