import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Party from '../containers/Party';

import './CampaignDetail.css';

class CampaignDetail extends Component {
  componentWillReceiveProps(newProps) {
    console.log("Detail:WRP", this.props, newProps);

    if(newProps.campaign && newProps.campaign.id && (!this.props.campaign || this.props.campaign.id !== newProps.campaign.id)) {
      console.log("New Campaign, fetching pages/sessions!", newProps.campaign, this.props.campaign);
      this.props.fetchCampaignPages(newProps.campaign.id);
      this.props.fetchSessions(newProps.campaign.id);
    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Detail:sCU", nextProps.campaign !== undefined);
    return nextProps.campaign !== undefined;
  }

  render() {
    if(!this.props.campaign) { return(null); }

    console.log("CampaignDetail", this.props);
    const campaign = this.props.campaign;
    const path = this.props.match.url;
    const pages = this.props.pages || {};
    const sessions = this.props.sessions || {};

    const campaignPages = Object.values(pages).map((page, index) => {
      return (
        <li key={index} className="menu-item">
          <Link to={path+ '/' + page.slug} style={{backgroundImage: 'url(' + campaign.acf.cover_art + ')'}}>
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
          <Link to={path + '/sessions/' + session.slug} style={{backgroundImage: 'url(' + session.acf.cover_art + ')'}}>
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
        <header>
          <h2>{name}</h2>
          <h3>Campaign Overview</h3>
          <Party path={this.props.match} />
        </header>

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
