import { STORE_LIST, SELECT_ITEM } from './types';
import { fetchData } from '../utils';

const storeList = (list, context) => {
  console.log("storeList", context);
  return {
    type: STORE_LIST,
    context: context,
    payload: {
      list: list
    }
  };
};

export function fetchList(endpoint, context) {
  console.log("fetchList", context);

  return dispatch => {
    fetchData(endpoint, list => {
      var indexedList = {};
      for(var i=0;i<list.length;i++) {
        const item = list[i];
        indexedList[item.slug] = item;
      }
      dispatch(storeList(indexedList, context));
    });
  };
}

export const selectItemBySlug = (slug, context) => {
  console.log("selectItemBySlug", slug, context);
  return {
    type: SELECT_ITEM,
    context: context,
    payload: {
      slug: slug
    }
  };
};

export function selectItem(slug, context) {
  console.log("selectItem", slug, context);
  return dispatch => {
    dispatch(selectItemBySlug(slug, context))
  };
}
