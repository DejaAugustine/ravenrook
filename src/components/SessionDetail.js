import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Party from './Party.js';
import NPCs from './NPCs.js';

import './SessionDetail.css';

class SessionDetail extends Component {

  parseSession(props) {
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
  }

  render() {
    const session = this.state.session;
    const campaign = this.state.campaign;
    const name = campaign ? campaign.name : "";
    const body = session ? session.content.rendered : "";
    const title = session ? session.title.rendered : "";
    const number = session ? "Session " + session.acf.session_number : "";

    return (
      <main className="session-detail">
        <header>
          <h3><Link to={this.state.campaignPath || "/"}>{name}: {number}</Link></h3>
          <h2>{title}</h2>
          <Party campaign={campaign} classes={this.state.classes} path={this.state.campaignPath} />
        </header>

        <NPCs campaign={campaign} session={session} path={this.state.campaignPath} />

        <section className="content" dangerouslySetInnerHTML={{__html: body}} />

        <nav>
          <ul className="menu">
            <li className="menu-item">{this.state.prevLink}</li>
            <li className="menu-item">{this.state.topLink}</li>
            <li className="menu-item">{this.state.nextLink}</li>
          </ul>
        </nav>
      </main>
    );
  }
};

export default SessionDetail;
