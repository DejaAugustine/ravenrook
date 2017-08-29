const campaign = (state = [], action) => {
  switch(action.type) {
    case 'STORE_CAMPAIGNS':
      return [
        ...state,
        {
          campaigns: action.campaigns,
          campaign_index: action.campaign_index
        }
      ]
    case 'SWITCH_CAMPAIGN':
      return [
        ...state,
        {
          active_campaign: action.active_campaign
        }
      ];
    default:
      return state;
  }
};

export default campaign;
