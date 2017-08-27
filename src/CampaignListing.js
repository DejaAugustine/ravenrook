import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import SiteNav from './SiteNav.js';
import Campaign from './Campaign.js';
import './CampaignListing.css';

class CampaignListing extends Component {

  parseCampaigns(props) {
    console.log("PC", props);

    if(!this.state || this.state.campaigns.length == 0) {
      fetch("https://api.therookandtheraven.com/wp-json/wp/v2/categories?parent=16")
        .then(res => res.json())
        .then(res => {
          this.setState({
            campaigns: res
          });

          for(var i=0;i<res.length;i++) {
            const campaign = res[i];
            var index = this.state.index || {};

            index[campaign.slug] = i;
            this.setState({
              index: index
            });

            if(props.location.pathname.indexOf(campaign.slug) !== -1) {
              this.setState({
                active: campaign
              });
            }
          }
        });
    }
  }

  componentDidMount() {
    this.parseCampaigns(this.props);
  }

  componentWillReceiveProps(newProps) {
    if(newProps === this.props) return;

    console.log("CampaignListing:WRP", { ...this.props, ...newProps });
    this.parseCampaigns({ ...this.props, ...newProps });
  }

  render() {
    console.log("CampaignListing:Render", this.state);
    if(!this.state) return(null);
    const state = this.state;

    const campaignList = state.campaigns.map((campaign, index) => {
      return <li key={index} className="menu-item"><NavLink to={'/campaigns/' + campaign.slug} style={{backgroundImage: 'url(' + campaign.acf.cover_art + ')'}}><span>{campaign.name}</span></NavLink></li>
    });

    return (
      <div>
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
