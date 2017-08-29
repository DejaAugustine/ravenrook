import { STORE_LIST, SELECT_ITEM } from './types';
import parseWPResponse from '../utils';

const storeList = (prefix, list, index) => {
  return {
    type: STORE_LIST,
    prefix: prefix,
    payload: {
      list: list,
      index: index
    }
  };
};

export function fetchList(prefix, endpoint) {
  return dispatch => {
    fetch(endpoint)
      .then(res => res.json())
      .then(res => parseWPResponse(res))
      .then(list => {
        var index = {};
        for(var i=0;i<list.length;i++) {
          const item = list[i];
          index[item.slug] = i;
        }
        dispatch(storeList(prefix, list, index));
      });
  };
}

export const selectItemBySlug = (prefix, slug) => {
  return {
    type: SELECT_ITEM,
    prefix: prefix,
    payload: {
      slug: slug
    }
  };
};

export function selectItem(prefix, slug) {
  return dispatch => {
    dispatch(selectItemBySlug(prefix, slug))
  };
}
