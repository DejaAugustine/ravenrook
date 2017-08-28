import React, { Component } from 'react';
import { parseWPResponse } from './utils.js';

class Character extends Component {
  fetchCharacter(props) {
    console.log("fC", props, this.state);

    if(props.campaign) {
      this.setState({
        campaignName: props.campaign.name
      });
    }

    if(props.match.params.characterSlug) {
      this.setState({
        characterSlug: props.match.params.characterSlug
      });

      fetch("https://api.therookandtheraven.com/wp-json/wp/v2/character?slug=" + props.match.params.characterSlug)
        .then(res => res.json())
        .then(res => parseWPResponse(res))
        .then(res => {
          this.setState({
            character: res[0]
          });
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

    return (
      <main>
        <header>
          <h3>{this.state.campaignName}</h3>
          <p><img src={character.acf.token} alt={character.title.rendered} /></p>
          <h2>{character.title.rendered}</h2>
          <h3>{character.acf.race_class}</h3>
        </header>

        <section className="content" dangerouslySetInnerHTML={{__html: character.content.rendered}} />
      </main>
    );
  }
};

export default Character;
