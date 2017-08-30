import { fetchList, selectItem } from './remoteIndexedList';
import { CONTEXT } from './types';

export const fetchCharacters = (campaignId) => {
  const endpoint = "https://api.therookandtheraven.com/wp-json/wp/v2/character?filter[orderby]=title&order=asc&categories_exclude=11&categories=" + campaignId;
  return fetchList(endpoint, CONTEXT.characters);
}

export const selectCharacter = (characterSlug) => {
  return selectItem(characterSlug, CONTEXT.characters);
}
