import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { parseWPResponse } from './utils.js';

import './Party.css';

class Party extends Component {
  parseCampaign(props) {
    if(props.campaign) {
      this.setState({
        campaign: props.campaign
      });

      fetch("https://api.therookandtheraven.com/wp-json/wp/v2/character?filter[orderby]=title&order=asc&categories_exclude=11&categories=" + props.campaign.id)
        .then(res => res.json())
        .then(res => parseWPResponse(res))
        .then(res => {
          this.setState({
            characters: res
          });
        });
    }
  }

  parseSession(props) {
    if(props.session) {
      var ids = props.session.acf.characters.map(function(character, index){
        return character.ID;
      });

      this.setState({
        session: props.session,
        present: ids
      });
    }
  }

  componentWillMount() {
    if(!this.state) {
      this.setState({
        characters: [],
        present: []
      });
    }

    this.parseCampaign(this.props);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.campaign && this.state.campaign !== newProps.campaign) {
      this.parseCampaign(newProps);
    }

    if(newProps.session && (!this.state.session || newProps.session.id !== this.state.session.id)) {
      this.parseSession(newProps);
    }
  }

  render() {

    const characterList = this.state.characters;
    const presentList = this.state.present;
    const session = this.state.session;

    const partyList = characterList.map(function(character, index){
      const present = presentList.includes(character.id);
      var classes = ["menu-item", "character"];
      if(!present && session) {
        classes.push("absent");
      }

      return <li key={index} className={classes.join(' ')} style={{backgroundImage: 'url(' + character.acf.token + ')'}}><Link to={'/characters/' + character.slug}><span>{character.acf.short_name || character.title.rendered}</span></Link></li>
    });

    return (
      <ul className="menu cast-list">
        {partyList}
      </ul>
    );
  }
};

export default Party;
