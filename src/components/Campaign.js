import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import CampaignDetail from './CampaignDetail';
import CampaignPage from './CampaignPage';
import SessionDetail from './SessionDetail';
import Character from './Character';

import parseWPResponse from '../utils';

import './Campaign.css';

class Campaign extends Component {

  parseCampaign(props) {
    if(!props.campaignIndex) return;

    const campaignSlug = props.match.params.campaignSlug;
    const campaignId = props.campaignIndex[campaignSlug];
    var campaign = props.campaigns[campaignId];

    if(campaign) {
      campaign.path = props.match.url;
      fetch("https://api.therookandtheraven.com/wp-json/wp/v2/session?per_page=100&categories=" + campaign.id + "&filter[orderby]=date&order=desc")
        .then(res => res.json())
        .then(res => parseWPResponse(res))
        .then(res => {
          this.setState({
            sessions: res
          });

          var index = this.state.index || {};
          for(var i=0;i<res.length;i++) {
            var session = res[i];

            index[session.slug] = i;

            if(props.location.pathname.endsWith(session.slug)) {
              this.setState({
                active: session
              });
            }
          };
          this.setState({
            index: index
          });
        });

      fetch("https://api.therookandtheraven.com/wp-json/wp/v2/campaign_pages?categories=" + campaign.id + "&filter[orderby]=date&order=desc")
        .then(res => res.json())
        .then(res => parseWPResponse(res))
        .then(res => {
          this.setState({
            pages: res
          });

          var pindex = this.state.pindex || {};
          for(var i=0;i<res.length;i++) {
            var page = res[i];

            pindex[page.slug] = i;
          };
          this.setState({
            pindex: pindex
          });
        });
    }

    this.setState({
      campaign: campaign
    });
  }

  componentWillMount() {
    this.props.fetchPages();

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
    console.log("Campaign", this.props);
    const campaign = this.state.campaign;
    const sessions = this.state.sessions;
    const pages = this.state.pages;
    const index = this.state.index;
    const pindex = this.state.pindex;

    return (
      <Switch>
        <Route path={this.props.match.url} exact render={props => <CampaignDetail campaign={campaign} sessions={sessions} pages={pages} {...props} />} />
        <Route path={this.props.match.url + '/characters/:characterSlug'} render={props => <Character campaign={campaign} {...props} />} />
        <Route path={this.props.match.url + '/campaign/:pageSlug'} render={props => <CampaignPage campaign={campaign} pages={pages}  pageIndex={pindex} {...props} />} />
        <Route path={this.props.match.url + '/:sessionSlug'} render={props => <SessionDetail campaign={campaign} sessions={sessions} sessionIndex={index} campaignPath={this.props.match.url} {...props} />} />
      </Switch>
    );
  }
};

export default Campaign;
