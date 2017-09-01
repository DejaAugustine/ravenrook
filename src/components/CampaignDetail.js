import React, { Component } from 'react';
import { Sticky } from 'react-sticky';

import Link from './LinkToTop';
import Party from '../containers/Party';

import './CampaignDetail.css';

class CampaignDetail extends Component {
  render() {
    if(!this.props.campaign) { return(null); }

    const campaign = this.props.campaign;
    const path = this.props.match.url.replace(/\/?$/, '');
    const pages = this.props.pages || {};
    const sessions = this.props.sessions || {};

    const campaignPages = Object.values(pages).map((page, index) => {
      return (
        <li key={index} className="menu-item">
          <Link to={path + '/' + page.slug} style={{backgroundImage: 'url(' + campaign.acf.cover_art + ')'}}>
            <span>
              {page.title.rendered}
            </span>
          </Link>
        </li>
      );
    });

    const sessionList = Object.values(sessions).map((session, index) => {
      return (
        <li key={index} className="menu-item">
          <Link to={path + '/session/' + session.slug} style={{backgroundImage: 'url(' + session.acf.cover_art + ')'}}>
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

    const notesHeader = campaignPages.length > 0 ? <h3>Setting Notes</h3> : '';
    const sessionHeader = sessionList.length > 0 ? <h3>Sessions</h3> : '';

    return (
      <main className="session-list">
        <Sticky topOffset={25}>
          {(props) => {
            return (
              <header style={props.style} className={props.isSticky ? "sticky is-sticky" : "sticky"}>
                <h2>{name}</h2>
                <h3>Campaign Overview</h3>
              </header>
            )
          }}
        </Sticky>

        <Party path={this.props.match} />
        <p className="description" dangerouslySetInnerHTML={{__html: description}} />

        {notesHeader}
        <ul className="session-listing menu campaign-pages">
          {campaignPages}
        </ul>

        {sessionHeader}
        <ul className="session-listing menu">
          {sessionList}
        </ul>
      </main>
    );
  }
};

export default CampaignDetail;
