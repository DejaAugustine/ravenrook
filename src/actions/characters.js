import { fetchList, selectItem } from './remoteIndexedList';
import { CONTEXT } from './types';

export const fetchCharacters = (campaignId) => {
  const endpoint = campaignId && "https://api.therookandtheraven.com/wp-json/wp/v2/character?filter[orderby]=title&order=asc&categories=" + campaignId;
  return fetchList(endpoint, CONTEXT.characters);
}

export const selectCharacter = (characterSlug) => {
  return selectItem(characterSlug, CONTEXT.characters);
}
