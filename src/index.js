import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import { CONTEXT } from './actions/types';

import App from './components/App';

import registerServiceWorker from './utils/registerServiceWorker';

import './index.css';

// prepopulate default state
const contexts = Object.keys(CONTEXT);
var initialState = {};
for(var i=0;i < contexts.length;i++) {
  initialState[contexts[i]] = {};
}

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers, initialState);

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root')
);

registerServiceWorker();
