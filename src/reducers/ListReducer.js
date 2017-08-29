import { STORE_LIST, SELECT_ITEM } from '../actions/types';

const defaultState = {
  list: [],
  index: []
};

const ListReducer = (state = defaultState, action) => {
  const prefix = action.prefix || 'root';

  switch(action.type) {
    case STORE_LIST:
      return {...state,
        [prefix]: {
          list: action.payload.list,
          index: action.payload.index
        }
      };
    case SELECT_ITEM:
      return {...state,
        [prefix]: {
          active: state.index[action.payload.slug]
        }
      };
    default:
      return state;
  }
};

export default ListReducer;
