import React, { Component } from 'react';
import { Sticky, StickyContainer } from 'react-sticky';

import Link from './LinkToTop';
import Party from '../containers/Party.js';

class Character extends Component {
  componentWillMount() {
    this.props.selectCharacter(this.props.match.params.characterSlug);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.characterSlug && this.props.characterSlug !== newProps.match.params.characterSlug) {
      this.props.selectCharacter(newProps.match.params.characterSlug);
    }
  }

  render() {
    const character = this.props.character || {};
    const campaignName = this.props.campaign ? this.props.campaign.name : '';
    var characterClasses = {};

    const backTo = this.props.match.path.replace(/\/character\/.*$/, '');

    if(!character.id) return(null);

    characterClasses[character.id] = "present";

    return (
      <main>
        <Sticky topOffset={25}>
          {(props) => {
            return (
              <header style={props.style} className={props.isSticky ? "sticky is-sticky" : "sticky"}>
                <h3><Link to={backTo}>{campaignName}</Link></h3>
              </header>
            )
          }}
        </Sticky>
        <Party classes={characterClasses} path={this.props.match} />
        <StickyContainer key={1}>
          <Sticky topOffset={25}>
            {(props) => {
              if(props.isSticky) {
                return (
                  <header style={props.style} className={props.isSticky ? "sticky is-sticky" : "sticky"}>
                    <div>
                      <h3><Link to={backTo}>{campaignName}</Link></h3>
                      <h2>{character.title.rendered} - {character.acf.race_class}</h2>
                    </div>
                  </header>
                )
              }

              return (
                <header style={props.style}>
                  <h2>{character.title.rendered}</h2>
                  <h3>{character.acf.race_class}</h3>
                </header>
              )
            }}
          </Sticky>

          <section className="content narrow" dangerouslySetInnerHTML={{__html: character.content.rendered}} />

        </StickyContainer>
      </main>
    );
  }
};

export default Character;
