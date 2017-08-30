import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCampaignPages, selectCampaign } from '../actions/campaigns';
import { fetchSessions } from '../actions/sessions';

import Campaign from '../components/Campaign';

export function activeCampaign(state) {
  var campaign;
  if(state.campaigns.list && state.campaigns.index && state.campaigns.activeSlug) {
    campaign = state.campaigns.list[state.campaigns.index[state.campaigns.activeSlug]];
  }
  return campaign;
}

export function campaignState(state) {
  return {
    campaignSlug: state.campaigns.activeSlug,
    campaign: activeCampaign(state),
    campaignPath: 'campaigns/' + state.campaigns.activeSlug
  }
}

function mapStateToProps(state) {
  const campaignStateFields = campaignState(state);

  return {
    ...campaignStateFields,
    sessions: state.sessions.list,
    sessionsIndex: state.sessions.index,
    pages: state.campaignPages.list,
    pagesIndex: state.campaignPages.index
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSessions: fetchSessions,
    fetchPages: fetchCampaignPages,
    selectCampaign: selectCampaign
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
