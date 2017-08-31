import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import CampaignDetail from '../containers/CampaignDetail';
import CampaignPage from './CampaignPage';
import SessionDetail from './SessionDetail';
import Character from '../containers/Character';

import './Campaign.css';

class Campaign extends Component {
  constructor(props) {
    console.log("C:ctor", props);
    super(props);
    props.selectCampaign(props.match.params.campaignSlug);
  }

  render() {
    console.log("Campaign:Render", this.props);
    const campaign = this.props.campaign;
    const sessions = this.props.sessions;
    const pages = this.props.pages;
    const index = this.props.sessions_index;
    const pindex = this.props.pages_index;
    const path = this.props.campaign_path;

    return (
      <Switch>
        <Route path='/campaigns/:campaignSlug' component={CampaignDetail} />
        <Route path='/campaigns/:campaignSlug/characters/:characterSlug' component={Character} />} />
        <Route path='/campaigns/:campaignSlug/:pageSlug' render={props => <CampaignPage campaign={campaign} pages={pages}  pageIndex={pindex} {...props} />} />
        <Route path='/campaigns/:campaignSlug/sessions/:sessionSlug' render={props => <SessionDetail campaign={campaign} sessions={sessions} sessionIndex={index} campaignPath={path} {...props} />} />
      </Switch>
    );
  }
};

export default Campaign;
