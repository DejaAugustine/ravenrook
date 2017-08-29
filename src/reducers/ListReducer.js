import { STORE_LIST, SELECT_ITEM } from '../actions/types';

const defaultState = {};

const ListReducer = (state = defaultState, action) => {
  console.log("ListReducer", state, action);
  const prefix = action.prefix ? action.prefix + "_" : '';
  switch(action.type) {
    case STORE_LIST:
      const out = {...state,
        [prefix + "list"]: action.payload.list,
        [prefix + "index"]: action.payload.index
      };
      console.log("STORE_LIST", out);
      return out;
    case SELECT_ITEM:
      return {...state,
        [prefix + "active"]: action.payload.slug
      };
    default:
      return state;
  }
};

export default ListReducer;
