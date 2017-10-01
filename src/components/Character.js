import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Sticky, StickyContainer } from 'react-sticky';

import Link from './LinkToTop';
import Credits from './Credits';
import Party from '../containers/Party';

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
    const characterShortName = character.acf && character.acf.short_name;
    const characterName = characterShortName || (character.title && character.title.rendered);
    const campaignName = this.props.campaign  && this.props.campaign.name;
    const credits = character.credits && Object.values(character.credits);

    var characterClasses = {};

    const backTo = this.props.match.path.replace(/\/character\/.*$/, '');

    if(!character.id) return(null);

    characterClasses[character.id] = "present";

    var metaTags = [];
    if(character.yoast && character.yoast.metadesc)
      metaTags.push({name:'description', content: character.yoast.metadesc});

    return (
      <main>
        <Helmet title={characterName + " - " + campaignName + " - The Rook and The Raven"} meta={metaTags} >
          <link rel="canonical" href={"https://therookandtheraven.com" + this.props.match.url} />
        </Helmet>
        <Sticky topOffset={25}>
          {(props) => {
            return (
              <header style={props.style} className={props.isSticky ? "sticky is-sticky" : "sticky"}>
                <h3><Link to={backTo}>{campaignName}</Link></h3>
              </header>
            )
          }}
        </Sticky>
        <Party classes={characterClasses} path={this.props.match} absentLabelText="" />
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

        <Credits credits={[credits]} />
      </main>
    );
  }
};

export default Character;
