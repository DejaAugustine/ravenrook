import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchList, selectItemBySlug } from '../actions/remoteIndexedList';

import Campaign from '../components/Campaign';

function mapStateToProps(state) {
  console.log("C:mSTP", state);
  return {
    campaign: state.campaigns.active,
    sessions: state.sessions.list,
    pages: state.campaignPages.list
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
      return selectItemBySlug("campaigns", slug);
    }
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
