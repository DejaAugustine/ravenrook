import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { StickyContainer } from 'react-sticky';

import './Campaign.css';

import CampaignDetail from '../containers/CampaignDetail';
import CampaignPage from '../containers/CampaignPage';
import SessionDetail from '../containers/SessionDetail';
import Character from '../containers/Character';

class Campaign extends Component {
  componentWillMount() {
    this.props.selectCampaign(this.props.match.params.campaignSlug);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.match.params.campaignSlug && this.props.campaignSlug !== newProps.match.params.campaignSlug) {
      this.props.selectCampaign(newProps.match.params.campaignSlug);
    }

    if(newProps.campaign && newProps.campaign.id && (!this.props.campaign || newProps.campaign.id !== this.props.campaign.id)) {
      this.props.fetchCharacters(newProps.campaign.id);
      this.props.fetchSessions(newProps.campaign.id);
      this.props.fetchCampaignPages(newProps.campaign.id);
    }
  }

  render() {
    return (
      <StickyContainer key={0} className="campaign" id="wrapper">
        <Switch>
          <Route path={this.props.match.url} exact component={CampaignDetail} />
          <Route path={this.props.match.url + '/character/:characterSlug'} component={Character} />} />
          <Route path={this.props.match.url + '/session/:sessionSlug'} component={SessionDetail} />
          <Route path={this.props.match.url + '/:pageSlug'} component={CampaignPage} />
        </Switch>
      </StickyContainer>
    );
  }
};

export default Campaign;
