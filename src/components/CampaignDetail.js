import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Party from '../containers/Party';

import './CampaignDetail.css';

class CampaignDetail extends Component {
  componentDidMount() {
    console.log("Detail:DM", this.props);
    if(this.props.campaigns && this.props.match.params.campaignSlug)
      this.props.selectCampaign(this.props.match.params.campaignSlug);
  }

  componentWillReceiveProps(newProps) {
    console.log("Detail:WRP", newProps, this.props);
    console.log("DWRP", !this.props.campaignSlug, "||", this.props.campaignSlug !== newProps.match.params.campaignSlug);
    if(!this.props.campaignSlug || this.props.campaignSlug !== newProps.match.params.campaignSlug) {
      this.props.selectCampaign(newProps.match.params.campaignSlug);
    }
  }

  render() {
    console.log("CampaignDetail", this.props);
    const campaign = this.props.campaign;
    const path = this.props.match.url;
    const pages = this.props.pages || [];
    const sessions = this.props.sessions || [];

    const campaignPages = pages.map((page, index) => {
      return (
        <li key={index} className="menu-item">
          <Link to={path+ '/campaign/' + page.slug} style={{backgroundImage: 'url(' + campaign.acf.cover_art + ')'}}>
            <span>
              {page.title.rendered}
            </span>
          </Link>
        </li>
      );
    });

    const sessionList = sessions.map((session, index) => {
      return (
        <li key={index} className="menu-item">
          <Link to={path + '/' + session.slug} style={{backgroundImage: 'url(' + session.acf.cover_art + ')'}}>
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
          <Party />
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
