import { STORE_LIST, SELECT_ITEM } from './types';
import { fetchData } from '../utils';

const storeList = (list, index, context) => {
  return {
    type: STORE_LIST,
    context: context,
    payload: {
      list: list,
      index: index
    }
  };
};

export function fetchList(endpoint, context) {
  return dispatch => {
    fetchData(endpoint, list => {
      var index = {};
      for(var i=0;i<list.length;i++) {
        const item = list[i];
        index[item.slug] = i;
      }
      dispatch(storeList(list, index, context));
    });
  };
}

export const selectItemBySlug = (slug, context) => {
  return {
    type: SELECT_ITEM,
    context: context,
    payload: {
      slug: slug
    }
  };
};

export function selectItem(slug, context) {
  return dispatch => {
    dispatch(selectItemBySlug(slug, context))
  };
}
