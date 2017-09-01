import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import CampaignDetail from '../containers/CampaignDetail';
import CampaignPage from '../containers/CampaignPage';
import SessionDetail from '../containers/SessionDetail';
import Character from '../containers/Character';

class Campaign extends Component {
  componentWillMount() {
    console.log("Campaign:WillMount", this.props);
    this.props.selectCampaign(this.props.match.params.campaignSlug);
  }

  componentWillReceiveProps(newProps) {
    console.log("Campaign:WRP", this.props, newProps);

    if(newProps.match.params.campaignSlug && this.props.campaignSlug !== newProps.match.params.campaignSlug) {
      console.log("Campaign:WRP:selectCampaign", this.props.campaignSlug, newProps.match.params.campaignSlug)
      this.props.selectCampaign(newProps.match.params.campaignSlug);
    }

    if(newProps.campaign && newProps.campaign.id && (!this.props.campaign || newProps.campaign.id !== this.props.campaign.id)) {
      console.log("muho", newProps.campaign.id);
      this.props.fetchCharacters(newProps.campaign.id);
      this.props.fetchSessions(newProps.campaign.id);
      this.props.fetchCampaignPages(newProps.campaign.id);
    }
  }

  render() {
    console.log("Campaign:Render", this.props);

    return (
      <Switch>
        <Route path={this.props.match.url} exact component={CampaignDetail} />
        <Route path={this.props.match.url + '/character/:characterSlug'} component={Character} />} />
        <Route path={this.props.match.url + '/session/:sessionSlug'} component={SessionDetail} />
        <Route path={this.props.match.url + '/:pageSlug'} component={CampaignPage} />
      </Switch>
    );
  }
};

export default Campaign;
