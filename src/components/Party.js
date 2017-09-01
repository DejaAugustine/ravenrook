import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Party.css';

class Party extends Component {

  render() {
    console.log("Party", this.props);
    const campaign = this.props.campaign;
    const characterList = this.props.characters || {};
    const session = this.props.session || {};
    const characterClasses = this.props.classes || undefined;
    const currentPath = this.props.path.path.replace(/\/session\/:sessionSlug/, '');
    const lastIndex = currentPath.lastIndexOf(':characterSlug')
    const characterPath = lastIndex > 0 ? currentPath.substr(0, lastIndex) : currentPath + '/character/';


    const partyList = Object.values(characterList).map(function(character, index){
      if(!character.categories.includes(10)) return (null);

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
