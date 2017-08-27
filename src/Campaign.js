import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SessionList from './SessionList.js';
import SessionDetail from './SessionDetail.js';
import { parseWPResponse } from './utils.js';
import './Campaign.css';

class Campaign extends Component {

  parseCampaign(props) {
    if(!props.campaignIndex) return;

    const campaignSlug = props.match.params.campaignSlug;
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
            sessions: res
          });

          for(var i=0;i<res.length;i++) {
            var session = res[i];
            var index = this.state.index || {};

            index[session.slug] = i;
            this.setState({
              index: index
            });

            if(props.location.pathname.endsWith(session.slug)) {
              this.setState({
                active: session
              });
            }
          };
        });
    }
  }

  componentWillMount() {
    if(!this.state) {
      this.setState({});
    }

    this.parseCampaign(this.props);
  }

  componentWillReceiveProps(newProps) {
    if(this.state.index && this.state.index === newProps.sessionIndex) return;

    this.parseCampaign(newProps);
  }

  render() {
    const campaign = this.state.campaign;
    const sessions = this.state.sessions;
    const index = this.state.index;

    return (
      <Switch>
        <Route path={this.props.match.url} exact render={props => <SessionList campaign={campaign} sessions={sessions} {...props} />} />
        <Route path={this.props.match.url + '/:sessionSlug'} render={props => <SessionDetail campaign={campaign} sessions={sessions} sessionIndex={index} campaignPath={this.props.match.url} {...props} />} />
      </Switch>
    );
  }
};

export default Campaign;
