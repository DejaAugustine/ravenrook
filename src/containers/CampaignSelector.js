import { connect } from 'react-redux';

const fetchCampaigns = (path) => {
  fetch("https://api.therookandtheraven.com/wp-json/wp/v2/categories?parent=16")
    .then(res => res.json())
    .then(res => {

      var index = {};
      for(var i=0;i<res.length;i++) {
        const campaign = res[i];
        index[campaign.slug] = i;

        if(props.location.pathname.indexOf(campaign.slug) !== -1) {
          dispatch(selectCampaign(i));
        }
      }

      dispatch(storeCampaigns({
        campaigns: res,
        campaign_index: index
      }));
    });
}
