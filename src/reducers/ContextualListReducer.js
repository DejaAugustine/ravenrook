import { STORE_LIST, SELECT_ITEM } from '../actions/types';

const ContextualListReducer = (state = {}, action) => {
  const {context} = action;

  switch(action.type) {
    case STORE_LIST:
      return {...state,
        [context]: {
          list: action.payload.list
        }
      };

    case SELECT_ITEM:
      const slug = action.payload.slug;
      var active = state[context] && state[context].list ?
        state[context].list[slug] : undefined;
      return {...state,
        [context]: {
          active: active,
          activeSlug: active ? slug : undefined
        }
      };

    default:
      return state;
  }
};

export default ContextualListReducer;
