import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import SessionList from './SessionList.js';
import SessionDetail from './SessionDetail.js';
import { parseWPResponse } from './utils.js';
import './Campaign.css';

class Campaign extends Component {

  parseCampaign(campaignSlug, props) {
    if(!props.campaignIndex) return;
    
    const campaignId = props.campaignIndex[campaignSlug];
    const campaign = props.campaigns[campaignId];

    this.setState({
      campaign: campaign
    });

    if(campaign) {
      fetch("https://api.therookandtheraven.com/wp-json/wp/v2/session?categories=" + campaign.id + "&filter[orderby]=date&order=desc")
        .then(res => res.json())
        .then(res => parseWPResponse(res))
        .then(res => {
          console.log("parseCampaign:Fetch");
          this.setState({
            items: res
          });

          for(var i=0;i<res.length;i++) {
            var item = res[i];
            var index = this.state.index || {};

            index[item.slug] = i;
            this.setState({
              index: index
            });

            if(props.location.pathname.endsWith(item.slug)) {
              this.setState({
                active: item
              });
            }
          };
        });
    }
  }

  componentWillMount() {
    this.setState({
      items: []
    });
  }

  componentDidMount() {
    const campaignSlug = this.props.match.params.campaignSlug;

    this.setState({
      campaignSlug: campaignSlug
    });

    if(campaignSlug && this.props.campaigns.length > 0) {
      this.parseCampaign(campaignSlug, this.props);
    }
  }

  componentWillReceiveProps(newProps) {
    if(this.props === newProps) {
      return;
    }

    const campaignSlug = newProps.match.params.campaignSlug || this.state.campaignSlug;

    if(campaignSlug && newProps.campaigns.length > 0) {
      this.parseCampaign(campaignSlug, newProps);
    }
  }

  render() {
    const campaign = this.state.campaign;
    const name = campaign ? campaign.name : '';
    const sessions = this.state.items;
    const index = this.state.index;

    return (
      <section className="campaign">
        <header>
          <h2>{name}</h2>
        </header>

        <Switch>
          <Route path={this.props.match.url} exact render={props => <SessionList campaign={campaign} sessions={sessions} {...props} />} />
          <Route path={this.props.match.url + '/:sessionSlug'} render={props => <SessionDetail campaign={campaign} sessions={sessions} sessionIndex={index} campaignPath={this.props.match.url} {...props} />} />
        </Switch>

      </section>
    );
  }
};

export default Campaign;
