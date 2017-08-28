import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Party from './Party.js';

import './SessionList.css';

class SessionList extends Component {
  componentWillMount() {
    this.setState({
      path: this.props.match.path,
      campaign: this.props.campaign,
      sessions: this.props.sessions || []
    });
  }

  componentWillReceiveProps(newProps) {
    if(!newProps.campaign) return;

    this.setState({
      path: newProps.match.path,
      campaign: newProps.campaign,
      sessions: newProps.sessions || []
    });
  }

  render() {
    const sessionList = this.state.sessions.map((session, index) => {
      return (
        <li key={index} className="menu-item">
          <Link to={this.props.match.url + '/' + session.slug} style={{backgroundImage: 'url(' + session.acf.cover_art + ')'}}>
            <span>
              Session {session.acf.session_number}<br />
              {session.title.rendered}
            </span>
          </Link>
        </li>
      );
    });

    const name = this.state.campaign ? this.state.campaign.name : '';
    const description = this.state.campaign ? this.state.campaign.description : '';

    return (
      <main className="session-list">
        <header>
          <h2>{name}</h2>
          <h3>Campaign Overview</h3>
          <Party campaign={this.state.campaign} path={this.props.match.url} />
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
