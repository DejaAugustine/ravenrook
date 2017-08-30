import { STORE_LIST, SELECT_ITEM } from '../actions/types';

const defaultState = {};

const ContextualListReducer = (contextId) => {
  return (state = defaultState, action) => {

    const {context} = action;
    if(contextId !== context)
      return state;

    switch(action.type) {
      case STORE_LIST:
        return {...state,
          list: action.payload.list,
          index: action.payload.index
        };

      case SELECT_ITEM:
        return {...state,
          activeSlug: action.payload.slug
        };

      default:
        return state;
    }
  }
};

export default ContextualListReducer;
