import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCampaignPages, selectCampaign } from '../actions/campaigns';
import { fetchSessions } from '../actions/sessions';
import { fetchCharacters } from '../actions/characters';

import Campaign from '../components/Campaign';

function mapStateToProps(state) {
  return {
    campaignSlug: state.campaigns.activeKey,
    campaign: state.campaigns.active
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCharacters: fetchCharacters,
    fetchSessions: fetchSessions,
    fetchCampaignPages: fetchCampaignPages,
    selectCampaign: selectCampaign
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
