import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCampaignPages, selectCampaign } from '../actions/campaigns';
import { fetchSessions } from '../actions/sessions';

import Campaign from '../components/Campaign';

function mapStateToProps(state) {
  var campaign;
  if(state.campaigns.list && state.campaigns.index && state.campaigns.active) {
    campaign = state.campaigns.list[state.campaigns.index[state.campaigns.active]];
  }

  return {
    campaignSlug: state.campaigns.active,
    campaign: campaign,
    sessions: state.sessions.list,
    sessions_index: state.sessions.index,
    pages: state.campaignPages.list,
    pages_index: state.campaignPages.index,
    campaign_path: 'campaigns/' + state.campaigns.active
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
