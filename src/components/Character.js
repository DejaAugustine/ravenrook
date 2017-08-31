import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from '../utils';
import Party from '../containers/Party.js';

class Character extends Component {
  componentWillMount() {
    if(!this.props.characters && this.props.campaign) {
      console.log("Character:WM:fetchCharacters", this.props.campaign.id);
      this.props.fetchCharacters(this.props.campaign.id);
    }
    this.props.selectCharacter(this.props.match.params.characterSlug);
  }

  componentWillReceiveProps(newProps) {
    console.log("WRP", this.props, newProps);
    if(newProps.characterSlug && this.props.characterSlug !== newProps.match.params.characterSlug) {

      console.log("WRP-Nest", newProps.match.params.characterSlug);
      this.props.selectCharacter(newProps.match.params.characterSlug);
    }

    if(isEmpty(this.props.characters) && newProps.campaign) {
      console.log("Character:WRP:fetchCharacters", newProps.campaign.id, this.props, newProps);
      this.props.fetchCharacters(newProps.campaign.id);
    }
  }

  render() {
    console.log("Character:render", this.props);
    const character = this.props.character || {};
    const campaignName = this.props.campaign ? this.props.campaign.name : '';
    var characterClasses = {};

    if(!character.id) return(null);

    characterClasses[character.id] = "present";
    // path.substr(0, path.lastIndexOf(':characterSlug'));
    return (
      <main>
        <header>
          <h3>{campaignName}</h3>
          <Party classes={characterClasses} path={this.props.match} />
          <h2>{character.title.rendered}</h2>
          <h3>{character.acf.race_class}</h3>
        </header>

        <section className="content narrow" dangerouslySetInnerHTML={{__html: character.content.rendered}} />

        <nav style={{clear: "both"}}>
          <ul className="menu">
            <li className="menu-item"><a href="/" onClick={this.props.history.goBack}>&lt; Back</a></li>
          </ul>
        </nav>
      </main>
    );
  }
};

export default Character;
