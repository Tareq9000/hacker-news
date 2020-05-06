import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { storyReducer } from './reducers/storyReducer.js'
import { commentReducer } from './reducers/commentReducer.js'
import { Provider } from 'react-redux';
import App from './components/App.jsx';
// import './style.css';

const store = createStore(combineReducers({storyReducer,commentReducer}))

const rendering = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>, 
    document.getElementById('root')
  );
}

store.subscribe(rendering);
rendering();

