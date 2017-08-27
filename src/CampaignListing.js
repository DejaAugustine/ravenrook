import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
import SiteNav from './SiteNav.js';
import Campaign from './Campaign.js';
import './CampaignListing.css';

class CampaignListing extends Component {

  fetchCampaigns(props) {
    console.log("CampaignListing:parseCampaigns", props);

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
  }

  render() {
    const campaignList = this.state.campaigns.map((campaign, index) => {
      return <li key={index} className="menu-item"><NavLink to={'/campaigns/' + campaign.slug} style={{backgroundImage: 'url(' + campaign.acf.cover_art + ')'}}><span>{campaign.name}</span></NavLink></li>
    });

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
              {campaignList}
            </ul>
          </nav>

          <Switch>
            <Route path={this.props.match.url + '/:campaignSlug'} render={props => <Campaign campaigns={this.state.campaigns} campaignIndex={this.state.index} {...props} />} />
          </Switch>
        </section>
      </div>
    );
  }
};

export default CampaignListing;
