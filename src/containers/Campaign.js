import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchList, selectItem } from '../actions/remoteIndexedList';

import Campaign from '../components/Campaign';

function mapStateToProps(state) {
  console.log("C:mSTP", state);
  var campaign;
  if(state.campaigns_list && state.campaigns_index && state.campaigns_active) {
    campaign = state.campaigns_list[state.campaigns_index[state.campaigns_active]];
  }

  return {
    campaignSlug: state.campaigns_active,
    campaign: campaign,
    sessions: state.sessions_list,
    sessions_index: state.sessions_index,
    pages: state.campaignPages_list,
    pages_index: state.campaignPages_index,
    campaign_path: 'campaigns/' + state.campaigns_active
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSessions: (campaignId) => {
      return fetchList("sessions", "https://api.therookandtheraven.com/wp-json/wp/v2/session?per_page=100&categories=" + campaignId + "&filter[orderby]=date&order=desc");
    },
    fetchPages: (campaignId) => {
      return fetchList("campaignPages", "https://api.therookandtheraven.com/wp-json/wp/v2/campaign_pages?categories=" + campaignId + "&filter[orderby]=date&order=desc");
    },
    selectCampaign: (slug) => {
      return selectItem("campaigns", slug);
    }
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
