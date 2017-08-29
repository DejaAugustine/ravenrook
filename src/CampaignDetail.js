import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Party from './Party.js';

import './CampaignDetail.css';

class CampaignDetail extends Component {
  parseState(props) {
    this.setState({
      path: props.match.path,
      campaign: props.campaign,
      sessions: props.sessions || [],
      pages: props.pages || []
    });
  }

  componentWillMount() {
    this.parseState(this.props);
  }

  componentWillReceiveProps(newProps) {
    if(!newProps.campaign) return;

    this.parseState(newProps);
  }

  render() {
    const campaign = this.state.campaign;

    const campaignPages = this.state.pages.map((page, index) => {
      return (
        <li key={index} className="menu-item">
          <Link to={this.props.match.url + '/campaign/' + page.slug} style={{backgroundImage: 'url(' + campaign.acf.cover_art + ')'}}>
            <span>
              {page.title.rendered}
            </span>
          </Link>
        </li>
      );
    });

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

    const name = campaign ? campaign.name : '';
    const description = campaign ? campaign.description : '';

    const settingNotes = campaignPages.length > 0 ? <h3>Setting Notes</h3> : '';
    const sessions = sessionList.length > 0 ? <h3>Sessions</h3> : '';

    return (
      <main className="session-list">
        <header>
          <h2>{name}</h2>
          <h3>Campaign Overview</h3>
          <Party campaign={campaign} path={this.props.match.url} />
        </header>

        <p className="description" dangerouslySetInnerHTML={{__html: description}} />

        {settingNotes}
        <ul className="session-listing menu campaign-pages">
          {campaignPages}
        </ul>

        {sessions}
        <ul className="session-listing menu">
          {sessionList}
        </ul>
      </main>
    );
  }
};

export default CampaignDetail;
