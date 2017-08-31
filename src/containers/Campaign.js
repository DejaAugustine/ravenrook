import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCampaignPages, selectCampaign } from '../actions/campaigns';
import { fetchSessions } from '../actions/sessions';

import Campaign from '../components/Campaign';

function mapStateToProps(state) {
  console.log("CmSTP", state);
  return {
    campaignSlug: state.campaigns.activeSlug,
    campaign: state.campaigns.active
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectCampaign: selectCampaign
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
