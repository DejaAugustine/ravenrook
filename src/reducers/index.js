import { combineReducers } from 'redux';

import ListReducer from './ListReducer';

const appReducer = ListReducer;

/*combineReducers({
  lists: ListReducer,
  sessions: ListReducer,
  campaignPages: ListReducer
});*/

export default appReducer;
