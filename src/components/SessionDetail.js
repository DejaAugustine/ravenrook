import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Party from '../containers/Party.js';
import NPCs from '../containers/NPCs.js';

import './SessionDetail.css';

class SessionDetail extends Component {

  /*parseSession(props) {
    const sessionSlug = props.match.params.sessionSlug;
    const campaign = props.campaign;
    const sessions = props.sessions;
    const index = props.sessionIndex;
    const campaignPath = props.campaignPath;

    if(index) {
      const top = <Link to={campaignPath}>Back to Campaign</Link>;
      var prev = <span>&nbsp;</span>
      var next = <span>&nbsp;</span>
      var session;
      var classes = {};

      if(index) {
        const i = index[sessionSlug];
        session = sessions[i];

        for(var j=0;j<session.acf.characters.length;j++) {
          const character = session.acf.characters[j];

          // Post-redux, check character state for dead and joined

          classes[character.ID] = "present";
        }

        // If not first session
        if(i < sessions.length - 1) {
          const prevSession = sessions[i + 1];
          prev = <Link to={campaignPath + '/' + prevSession.slug}>&lt; Session {prevSession.acf.session_number}</Link>;
        }

        // If not the last session
        if(i > 0) {
          const nextSession = sessions[i - 1];
          next = <Link to={campaignPath + '/' + nextSession.slug}>Session {nextSession.acf.session_number} &gt;</Link>;
        }
      }

      this.setState({
        sessionSlug: sessionSlug,
        campaign: campaign,
        campaignPath: campaignPath,
        sessions: sessions,
        session: session,
        index: index,
        prevLink: prev,
        topLink: top,
        nextLink: next,
        classes: classes
      });
    } else {
      this.setState({
        sessions: [],
        index: {},
        classes: {}
      });
    }
  }

  componentWillMount() {
    this.parseSession(this.props);
  }

  componentWillReceiveProps(newProps) {
    if(this.state.sessionSlug === newProps.match.params.sessionSlug && this.state.index === newProps.sessionIndex) return;

    this.parseSession(newProps);
  }*/

  componentWillMount() {
    console.log("Session:WM", this.props);
    this.props.selectSession(this.props.match.params.sessionSlug);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.match.params.sessionSlug && (!this.props.sessionSlug || newProps.match.params.sessionSlug !== this.props.sessionSlug)) {
      newProps.selectSession(newProps.match.params.sessionSlug);
    }
  }

  render() {
    console.log("SessionDetail:render", this.props);
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
      });
      console.log("characterClasses", characterClasses);
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
