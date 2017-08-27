import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Party from './Party.js';
import NPCs from './NPCs.js';

class SessionDetail extends Component {
  componentWillMount() {
    this.setState({
      sessions: [],
      index: {}
    })
  }

  componentDidMount() {
    const sessionSlug = this.props.match.params.sessionSlug;

    if(sessionSlug) {
      console.log("SessionDetail", this.props);
      return;
      
      const campaign = this.props.route.campaign;
      const sessions = this.props.route.sessions;
      const index = this.props.route.sessionIndex;
      const campaignPath = this.props.route.campaignPath;

      const i = index[sessionSlug];
      const top = <Link to={campaignPath}>Back to Campaign</Link>;
      var prev = <span>&nbsp;</span>
      var next = <span>&nbsp;</span>

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

      this.setState({
        campaign: campaign,
        sessions: sessions,
        index: index,
        prevLink: prev,
        topLink: top,
        nextLink: next
      });
    }
  }

  render() {
    console.log("Detail", this.props);
    const session = this.props.session;
    const campaign = this.props.campaign;
    const body = session ? session.content.rendered : "";
    const title = session ? session.title.rendered : "";

    return (
      <main>
        <header>
          <h3>{title}</h3>
          <Party campaign={campaign} session={session} />
        </header>

        <NPCs campaign={campaign} session={session} />

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
