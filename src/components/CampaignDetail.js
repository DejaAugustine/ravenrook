import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Sticky } from 'react-sticky';
import moment from 'moment';

import Link from './LinkToTop';
import Party from '../containers/Party';
import Credits from './Credits';

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
          <Link to={path + '/' + page.slug} style={{backgroundImage: 'url(' + campaign.acf.cover_art.sizes.medium + ')'}}>
            <span>
              {page.title.rendered}
            </span>
          </Link>
        </li>
      );
    });

    var sessionCredits = [];
    const sessionList = Object.values(sessions).map((session, index) => {
      sessionCredits.push(session.acf.cover_credits);
      const postDate = moment(session.date_gmt);
      return (
        <li key={index} className="menu-item">
          <Link to={path + '/session/' + session.slug} style={{backgroundImage: 'url(' + session.acf.cover_art.sizes.medium + ')'}}>
            <span>
              Session {session.acf.session_number}<br />
              {session.title.rendered}
            </span>
          </Link>
          <p className="caption">Posted on {postDate.format("MMMM Do, YYYY")}</p>
        </li>
      );
    });

    const name = campaign && campaign.name;
    const description = campaign && campaign.description;

    const notesHeader = campaignPages.length > 0 ? <h3>Setting Notes</h3> : '';
    const sessionHeader = sessionList.length > 0 ? <h3>Sessions</h3> : '';

    var campaignStatus;
    /*if(campaign && campaign.acf) {
      if(campaign.acf.campaign_status === "Ongoing") {
        const nextSession = moment(campaign.acf.next_session);
        campaignStatus = (<p className="campaign-status description">
          We're playing session {parseInt(campaign.acf.sessions_played, 10) + 1} on {nextSession.format("dddd, MMMM Do, YYYY")}!
        </p>);
      } else if(campaign.acf.campaign_status === "Ended") {
        const finalSession = moment(campaign.acf.next_session);
        campaignStatus = (<p className="campaign-status description">
          After {parseInt(campaign.acf.sessions_played, 10)} sessions, the final die was thrown on {finalSession.format("dddd, MMMM Do, YYYY")}
        </p>);
      }
    }*/

    const metaTags = [];
    if(campaign && campaign.acf && campaign.acf.meta_description) {
      metaTags.push({ name: 'description', content: campaign.acf.meta_description })
    }
    return (
      <main className="session-list">
        <Helmet title={name + " - The Rook and The Raven"} meta={metaTags} >
          <link rel="canonical" href={"https://therookandtheraven.com" + this.props.match.url} />
        </Helmet>
        <Sticky topOffset={25}>
          {(props) => {
            return (
              <header style={props.style} className={props.isSticky ? "sticky is-sticky" : "sticky"}>
                <div>
                  <h2>{name}</h2>
                  <h3>Campaign Overview</h3>
                </div>
              </header>
            )
          }}
        </Sticky>

        <Party path={this.props.match} />
        {campaignStatus}
        <p className="description" dangerouslySetInnerHTML={{__html: description}} />

        {notesHeader}
        <ul className="session-listing menu campaign-pages">
          {campaignPages}
        </ul>

        {sessionHeader}
        <ul className="session-listing menu">
          {sessionList}
        </ul>

        <Credits credits={sessionCredits} />
      </main>
    );
  }
};

export default CampaignDetail;
