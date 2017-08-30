import { combineReducers } from 'redux';

import { CONTEXT } from '../actions/types';
import ListReducer from './ContextualListReducer';

const appReducer = combineReducers({
  campaigns: ListReducer(CONTEXT.campaigns),
  sessions: ListReducer(CONTEXT.sessions),
  campaignPages: ListReducer(CONTEXT.campaignPages),
  characters: ListReducer(CONTEXT.characters)
});

export default appReducer;
