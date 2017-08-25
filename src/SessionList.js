import React, { Component } from 'react';
import Party from './Party.js';

import './SessionList.css';

class SessionList extends Component {
  render() {
    const sessionList = this.props.sessions.map((session, index) => {
      return <li key={index} className="menu-item" style={{backgroundImage: 'url(' + session.acf.cover_art + ')'}}><a href={this.props.match.url + '/' + session.slug}><span>Session {session.acf.session_number}<br />{session.title.rendered}</span></a></li>
    });

    const description = this.props.campaign ? this.props.campaign.description : '';

    return (
      <main>
        <header>
          <h3>Campaign Overview</h3>
          <Party campaign={this.props.campaign} />
        </header>

        <p className="description">{description}</p>

        <ul className="session-listing menu">
          {sessionList}
        </ul>
      </main>
    );
  }
};

export default SessionList;
