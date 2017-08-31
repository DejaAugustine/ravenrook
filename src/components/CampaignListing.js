import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";

import SiteNav from './SiteNav';
import CampaignDetail from '../containers/CampaignDetail';
import CampaignPage from './CampaignPage';
import SessionDetail from './SessionDetail';
import Character from '../containers/Character';

import './CampaignListing.css';

class CampaignListing extends Component {

  constructor(props) {
    super(props);
    props.fetchCampaigns();
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
          <meta name="description" content="The Rook and The Raven have played four Dungeons and Dragons 5th edition campaigns. Select one from the list to follow along!"/>
          <link rel="canonical" href="https://therookandtheraven.com/campaigns/" />
        </Helmet>
        <SiteNav />
        <section className="campaigns">
          <nav className="campaign-listing">
            <ul className="menu">
              {this.renderCampaignList()}
            </ul>
          </nav>

          <Switch>
            <Route path={this.props.match.url + '/:campaignSlug'} exact component={CampaignDetail} />
            <Route path={this.props.match.url + '/:campaignSlug/characters/:characterSlug'} component={Character} />} />
            <Route path={this.props.match.url + '/:campaignSlug/:pageSlug'} component={CampaignPage} />
            <Route path={this.props.match.url + '/:campaignSlug/sessions/:sessionSlug'} component={SessionDetail} />
          </Switch>
        </section>
      </div>
    );
  }
};

export default CampaignListing;
