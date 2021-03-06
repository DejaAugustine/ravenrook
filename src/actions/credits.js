import { fetchList, selectItem } from './remoteIndexedList';
import { CONTEXT } from './types';

export const fetchSessions = (campaignId) => {
  const endpoint = campaignId && "https://api.therookandtheraven.com/wp-json/wp/v2/session?categories=" + campaignId + "&filter[orderby]=date&order=desc";
  return fetchList(endpoint, CONTEXT.sessions);
}

export const selectSession = (sessionSlug) => {
  return selectItem(sessionSlug, CONTEXT.sessions);
}
