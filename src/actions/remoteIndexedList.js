import { STORE_LIST, SELECT_ITEM } from './types';
import { fetchData } from '../utils';

const storeList = (list, context) => {
  return {
    type: STORE_LIST,
    context: context,
    payload: {
      list: list
    }
  };
};

export function fetchList(endpoint, context) {
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

export const selectItemByKey = (key, context) => {
  return {
    type: SELECT_ITEM,
    context: context,
    payload: {
      key: key
    }
  };
};

export function selectItem(key, context) {
  return dispatch => {
    dispatch(selectItemByKey(key, context))
  };
}
