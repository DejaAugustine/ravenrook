import { connect } from 'react-redux';
import CampaignDetail from '../components/CampaignDetail';

import { campaignState } from './Campaign'

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

export default connect(mapStateToProps, null)(CampaignDetail);
