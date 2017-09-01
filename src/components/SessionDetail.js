import React, { Component } from 'react';
import Party from '../containers/Party.js';
import NPCs from '../containers/NPCs.js';

import './SessionDetail.css';

class SessionDetail extends Component {
  componentWillMount() {
    this.props.selectSession(this.props.match.params.sessionSlug);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.match.params.sessionSlug && (!this.props.sessionSlug || newProps.match.params.sessionSlug !== this.props.sessionSlug)) {
      newProps.selectSession(newProps.match.params.sessionSlug);
    }
  }

  render() {
    if(!this.props.session) return(null);

    const session = this.props.session;
    const campaign = this.props.campaign;
    const name = campaign ? campaign.name : "";
    const body = session.content ? session.content.rendered : "";
    const title = session.title ? session.title.rendered : "";
    const number = session.acf ? "Session " + session.acf.session_number : "";

    var characterClasses = {};
    if(session.acf) {
      session.acf.characters.map(function(character, index){
        characterClasses[character.ID] = "present";
        return character.ID;
      });
    }

    return (
      <main className="session-detail">
        <header>
          <h3>{name}: {number}</h3>
          <h2>{title}</h2>
          <Party classes={characterClasses} path={this.props.match} />
        </header>

        <NPCs />

        <section className="content" dangerouslySetInnerHTML={{__html: body}} />

        <nav>
          <ul className="menu">

          </ul>
        </nav>
      </main>
    );
  }
};

export default SessionDetail;
