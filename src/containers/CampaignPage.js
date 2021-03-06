import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectCampaignPage } from '../actions/campaigns';

import CampaignPage from '../components/CampaignPage';

function mapStateToProps(state) {
  return {
    campaign: state.campaigns.active,
    pages: state.campaignPages.list,
    pageSlug: state.campaignPages.activeKey,
    page: state.campaignPages.active
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectCampaignPage: selectCampaignPage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignPage);
