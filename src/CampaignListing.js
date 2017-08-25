import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Campaign from './Campaign.js';
import './CampaignListing.css';

class CampaignListing extends Component {
  componentWillMount() {
    this.setState({
      campaigns: [],
      index: {}
    })
  }

  componentDidMount() {
    const $this = this;

    fetch("http://api.therookandtheraven.com/wp-json/wp/v2/categories?parent=16")
      .then(res => res.json())
      .then(res => {
        $this.setState({
          campaigns: res
        });

        for(var i=0;i<res.length;i++) {
          const campaign = res[i];
          var index = $this.state.index || {};

          index[campaign.slug] = i;
          $this.setState({
            index: index
          });

          if($this.props.location.pathname.indexOf(campaign.slug) !== -1) {
            $this.setState({
              active: campaign
            });
          }
        }
      });
  }

  render() {
    const state = this.state;

    const campaignList = state.campaigns.map((campaign, index) => {
      var classes = "menu-item";
      if(state.active && campaign.id === state.active.id) {
        classes = classes + " active";
      }

      return <li key={index} className={classes} style={{backgroundImage: 'url(' + campaign.acf.cover_art + ')'}}><a href={'/campaigns/' + campaign.slug}><span>{campaign.name}</span></a></li>
    });

    return (
      <section className="campagins">
        <nav className="campaign-listing">
          <ul className="menu">
            {campaignList}
          </ul>
        </nav>

        <Route path={this.props.match.url + '/:campaignId'} render={function(props) {
          const index = state.index[props.match.params.campaignId];
          const campaign = index ? state.campaigns[index] : undefined;
          return (
            <Campaign campaign={campaign} {...props} />
          );
        }} />
      </section>
    );
  }
};

export default CampaignListing;
