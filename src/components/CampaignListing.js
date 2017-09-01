import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Helmet } from "react-helmet";

import SiteNav from './SiteNav';
import Campaign from '../containers/Campaign';

import './CampaignListing.css';

class CampaignListing extends Component {

  componentWillMount() {
    this.props.fetchCampaigns();
  }

  renderCampaignList() {
    if(this.props.campaigns) {
      const campaigns = Object.values(this.props.campaigns);
      return campaigns.map((campaign, index) => {
        return <li key={index} className="menu-item"><NavLink to={'/campaigns/' + campaign.slug} style={{backgroundImage: 'url(' + campaign.acf.cover_art + ')'}}><span>{campaign.name}</span></NavLink></li>
      });
    } else {
      return (null);
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Campaign List - The Rook and The Raven</title>
          <link rel="canonical" href="https://therookandtheraven.com/campaigns/" />
        </Helmet>
        <SiteNav />
        <section className="campaigns">
          <nav className="campaign-listing">
            <ul className="menu">
              {this.renderCampaignList()}
            </ul>
          </nav>

          <Route path={this.props.match.url + '/:campaignSlug'} component={Campaign} />
        </section>
      </div>
    );
  }
};

export default CampaignListing;
