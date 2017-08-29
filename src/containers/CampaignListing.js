import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchList } from '../actions/remoteIndexedList';
import CampaignListing from '../components/CampaignListing';

function mapStateToProps(state) {
  console.log("CL:mSTP", state);
  return {
    campaigns: state.campaigns_list || [],
    campaignIndex: state.campaigns_index || []
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCampaigns: () => {
      console.log("fetchCampaigns");
      return fetchList("campaigns", "https://api.therookandtheraven.com/wp-json/wp/v2/categories?parent=16");
    }
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignListing);
