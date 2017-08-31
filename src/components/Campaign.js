import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import CampaignDetail from '../containers/CampaignDetail';
import CampaignPage from './CampaignPage';
import SessionDetail from './SessionDetail';
import Character from '../containers/Character';

class Campaign extends Component {
  componentWillMount() {
    console.log("Campaign:WillMount", this.props);
    this.props.selectCampaign(this.props.match.params.campaignSlug);
  }

  componentWillReceiveProps(newProps) {
    console.log("Campaign:WRP", this.props, newProps);

    if(newProps.campaignSlug) {
      if(this.props.campaignSlug !== newProps.match.params.campaignSlug) {
        this.props.selectCampaign(newProps.match.params.campaignSlug);
      }
    }
  }

  render() {
    console.log("Campaign:Render", this.props);

    return (
      <Switch>
        <Route path={this.props.match.url} exact component={CampaignDetail} />
        <Route path={this.props.match.url + '/characters/:characterSlug'} component={Character} />} />
        <Route path={this.props.match.url + '/sessions/:sessionSlug'} component={SessionDetail} />
        <Route path={this.props.match.url + '/:pageSlug'} component={CampaignPage} />
      </Switch>
    );
  }
};

export default Campaign;
