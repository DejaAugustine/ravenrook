import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCampaigns } from '../actions/campaigns';
import CampaignListing from '../components/CampaignListing';

function mapStateToProps(state) {
  return {
    campaigns: state.campaigns.list || [],
    campaignIndex: state.campaigns.index || []
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCampaigns: fetchCampaigns
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignListing);
