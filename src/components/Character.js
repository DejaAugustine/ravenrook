import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Party from '../containers/Party.js';

class Character extends Component {
  componentWillMount() {
    //this.props.fetchCharacters();
    this.props.selectCharacter(this.props.match.params.characterSlug);
  }

  componentWillReceiveProps(newProps) {
    console.log("WRP", this.props, newProps);
    if(!this.props.character || this.props.character.slug !== newProps.match.params.characterSlug) {

      console.log(newProps.match.params.characterSlug);
      this.props.selectCharacter(newProps.match.params.characterSlug);
    }
  }

  render() {
    const character = this.props.character;
    const campaignName = this.props.campaign ? this.props.campaign.name : '';
    const campaignPath = this.props.campaignPath;
    var characterClasses = {};

    if(!character) return(null);

    characterClasses[character.id] = "present";

    return (
      <main>
        <header>
          <h3><Link to={campaignPath}>{campaignName}</Link></h3>
          <Party classes={characterClasses} />
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
