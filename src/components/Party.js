import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Party.css';

class Party extends Component {
  componentWillMount() {
    console.log("PWM", this.props);
    if(this.props.campaign)
      this.props.fetchCharacters(this.props.campaign.id);
  }

  componentWillReceiveProps(newProps) {
    console.log("2")
    if(newProps.campaign) {
      console.log("5", this.props.campaign , "||", newProps)
      if(!this.props.campaign || newProps.campaign.id !== this.props.campaign.id) {
        console.log("9")
        newProps.fetchCharacters(newProps.campaign.id);
      }
    }
  }

  render() {
    console.log("Party", this.props);
    const characterList = this.props.characters || {};
    const characterClasses = undefined; //this.props.sessions.classes || undefined;
    const currentPath = this.props.path.path;
    const characterPath = currentPath.substr(0, currentPath.lastIndexOf(':characterSlug'));

    const partyList = Object.values(characterList).map(function(character, index){
      var classes = ["menu-item", "character"];

      if(characterClasses) {
        classes = classes.concat(characterClasses[character.id]);
      } else {
        classes = classes.concat("present");
      }

      return <li key={index} className={classes.join(' ')} style={{backgroundImage: 'url(' + character.acf.token + ')'}}><Link to={characterPath + character.slug}><span>{character.acf.short_name || character.title.rendered}</span></Link></li>
    });

    return (
      <ul className="menu cast-list">
        {partyList}
      </ul>
    );
  }
};

export default Party;
