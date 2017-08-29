export const storeCampaigns = () => {

};

export const selectCampaign = (campaignId) => {
  return {
    type: 'SWITCH_CAMPAIGN',
    campaignId: campaignId
  };
};
