import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { parseWPResponse } from './utils.js';

import './Party.css';

class Party extends Component {
  parseCampaign(props) {
    if(props.campaign) {
      this.setState({
        campaign: props.campaign,
        path: props.campaign.path
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

  componentWillMount() {
    if(!this.state) {
      this.setState({
        characters: [],
        classes: this.props.classes
      });
    }

    this.parseCampaign(this.props);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.campaign && this.state.campaign !== newProps.campaign) {
      this.parseCampaign(newProps);
    }

    if(newProps.classes && (newProps.classes !== this.state.classes)) {
      this.setState({
        classes: newProps.classes
      });
    }
  }

  render() {
    const characterList = this.state.characters;
    const characterClasses = this.state.classes;
    const path = this.state.path;

    const partyList = characterList.map(function(character, index){
      var classes = ["menu-item", "character"];

      if(characterClasses) {
        classes = classes.concat(characterClasses[character.id]);
      } else {
        classes = classes.concat("present");
      }

      return <li key={index} className={classes.join(' ')} style={{backgroundImage: 'url(' + character.acf.token + ')'}}><Link to={path.replace(/\/$/, "") + '/characters/' + character.slug}><span>{character.acf.short_name || character.title.rendered}</span></Link></li>
    });

    return (
      <ul className="menu cast-list">
        {partyList}
      </ul>
    );
  }
};

export default Party;
