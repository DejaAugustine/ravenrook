import { fetchList, selectItem } from './remoteIndexedList';
import { CONTEXT } from './types';

export const fetchCampaigns = () => {
  const endpoint = "https://api.therookandtheraven.com/wp-json/wp/v2/categories?parent=16";
  return fetchList(endpoint, CONTEXT.campaigns);
}

export const selectCampaign = (campaignSlug) => {
  return selectItem(campaignSlug, CONTEXT.campaigns);
}

export const fetchCampaignPages = (campaignId) => {
  const endpoint = campaignId && "https://api.therookandtheraven.com/wp-json/wp/v2/campaign_pages?categories=" + campaignId + "&filter[orderby]=date&order=desc";
  return fetchList(endpoint, CONTEXT.campaignPages);
}
