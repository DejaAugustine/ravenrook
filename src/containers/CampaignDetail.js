import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCampaigns, fetchCampaignPages, selectCampaign } from '../actions/campaigns';
import { fetchSessions } from '../actions/sessions';

import CampaignDetail from '../components/CampaignDetail';

function mapStateToProps(state) {
  console.log("CDmSTP", state);
  return {
    campaignSlug: state.campaigns.activeSlug,
    campaign: state.campaigns.active,
    campaigns: state.campaigns.list,
    sessions: state.sessions.list,
    pages: state.campaignPages.list
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCampaigns: fetchCampaigns,
    fetchSessions: fetchSessions,
    fetchPages: fetchCampaignPages,
    selectCampaign: selectCampaign
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetail);
