import React, { Component } from 'react';
import { render } from 'react-dom';
import StoryLog from './StoryLog';
import { connect } from 'react-redux';
import Spinner from 'react-spinner-material';

export class App extends Component {

  render() {
    const { loadingSpinner } = this.props
    return (
      <div id="app-box">
          <h1>Hacker News</h1>
          <StoryLog />
          <div className="spinner-box">
            <Spinner 
              size={40} 
              spinnerColor={"black"} 
              spinnerWidth={5} 
              visible={loadingSpinner} 
            />
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { loadingSpinner: state.storyReducer.loadingSpinner }
}

export default connect(mapStateToProps)(App);
