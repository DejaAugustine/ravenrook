import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { parseWPResponse } from '../utils/utils.js';
import Party from './Party.js';

class Character extends Component {
  fetchCharacter(props) {
    if(props.campaign) {
      this.setState({
        campaign: props.campaign
      });
    }

    if(props.match.params.characterSlug) {
      fetch("https://api.therookandtheraven.com/wp-json/wp/v2/character?slug=" + props.match.params.characterSlug)
        .then(res => res.json())
        .then(res => parseWPResponse(res))
        .then(res => {
          const character = res[0];

          if(character) {
            this.setState({
              character: character,
              characterSlug: character.slug
            });
          }
        });
    }
  }

  componentWillMount() {
    if(!this.state) {
      this.setState({
        character: { title: {}, content: {}, acf: {} }
      });
    }

    this.fetchCharacter(this.props);
  }

  componentWillReceiveProps(newProps) {
    if(this.state.characterSlug && this.state.characterSlug === newProps.characterSlug) return;

    this.fetchCharacter(newProps);
  }

  render() {
    const character = this.state.character;
    const campaignName = this.state.campaign ? this.state.campaign.name : '';
    const campaignPath = this.state.campaign ? this.state.campaign.path : '';
    var characterClasses = {};
    characterClasses[character.id] = "present";

    return (
      <main>
        <header>
          <h3><Link to={campaignPath}>{campaignName}</Link></h3>
          <Party campaign={this.state.campaign} classes={characterClasses} />
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
