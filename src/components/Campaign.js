import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import CampaignDetail from '../containers/CampaignDetail';
import CampaignPage from './CampaignPage';
import SessionDetail from './SessionDetail';
import Character from '../containers/Character';

import './Campaign.css';

class Campaign extends Component {

  componentWillMount() {
    if(this.props.campaign)
      this.props.fetchPages(this.props.campaign.id);

    this.props.selectCampaign(this.props.match.params.campaignSlug);
  }

  componentWillReceiveProps(newProps) {

    if(newProps.match.params.campaignSlug && newProps.match.params.campaignSlug !== this.props.match.params.campaignSlug) {
      newProps.selectCampaign(newProps.match.params.campaignSlug);
    }

    if(newProps.campaign) {
      if(!this.props.campaign || newProps.campaign.id !== this.props.campaign.id) {
        newProps.fetchPages(newProps.campaign.id);
        newProps.fetchSessions(newProps.campaign.id);
      }
    }
  }

  render() {
    const campaign = this.props.campaign;
    const sessions = this.props.sessions;
    const pages = this.props.pages;
    const index = this.props.sessions_index;
    const pindex = this.props.pages_index;
    const path = this.props.campaign_path;

    return (
      <Switch>
        <Route path={this.props.match.url} exact component={CampaignDetail} />
        <Route path={this.props.match.url + '/characters/:characterSlug'} component={Character} />} />
        <Route path={this.props.match.url + '/campaign/:pageSlug'} render={props => <CampaignPage campaign={campaign} pages={pages}  pageIndex={pindex} {...props} />} />
        <Route path={this.props.match.url + '/:sessionSlug'} render={props => <SessionDetail campaign={campaign} sessions={sessions} sessionIndex={index} campaignPath={path} {...props} />} />
      </Switch>
    );
  }
};

export default Campaign;
