import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";

import SiteNav from './SiteNav';
import Campaign from '../containers/Campaign';

import './CampaignListing.css';

class CampaignListing extends Component {

  /*fetchCampaigns(props) {
    fetch("https://api.therookandtheraven.com/wp-json/wp/v2/categories?parent=16")
      .then(res => res.json())
      .then(res => {
        this.setState({
          campaigns: res
        });

        var index = this.state.index || {};
        for(var i=0;i<res.length;i++) {
          const campaign = res[i];

          index[campaign.slug] = i;

          if(props.location.pathname.indexOf(campaign.slug) !== -1) {
            this.setState({
              active: campaign
            });
          }
        }
        this.setState({
          index: index
        });
      });
  }

  componentWillMount() {
    if(!this.state) {
      this.setState({
        campaigns: []
      });
    }

    this.fetchCampaigns(this.props);
  }*/

  componentWillMount() {
    this.props.fetchCampaigns();
  }

  renderCampaignList() {
    if(this.props.campaigns) {
      console.log("rCL", this.props);
      return this.props.campaigns.map((campaign, index) => {
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
        <section className="campagins">
          <nav className="campaign-listing">
            <ul className="menu">
              {this.renderCampaignList()}
            </ul>
          </nav>

          <Switch>
            <Route path={this.props.match.url + '/:campaignSlug'} render={props => <Campaign campaigns={this.props.campaigns} campaignIndex={this.props.campaignIndex} {...props} />} />
          </Switch>
        </section>
      </div>
    );
  }
};

export default CampaignListing;
