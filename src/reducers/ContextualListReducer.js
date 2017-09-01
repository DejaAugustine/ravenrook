import { STORE_LIST, SELECT_ITEM } from '../actions/types';

function selectItem(list, key) {
  var active = {};

  if(list) {
    active = list[key];
  }

  return {
    list: list,
    activeKey: key,
    active: active
  };
}

const ContextualListReducer = (state = {}, action) => {
  const {context} = action;
  const prevContext = state[context];

  switch(action.type) {
    case STORE_LIST:
      return {
        ...state,
        [context]: {
          ...prevContext,
          ...selectItem(action.payload.list, prevContext.activeKey)
        }
      };

    case SELECT_ITEM:
      return {
        ...state,
        [context]: {
          ...prevContext,
          ...selectItem(state[context].list, action.payload.key)
        }
      };

    default:
      return state;
  }
};

export default ContextualListReducer;
