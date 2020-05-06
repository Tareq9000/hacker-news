import React, { Component } from 'react';
import Comment from './Comment';
import Story from './Story';
import { fetchAPI } from '../fetchAPI';
import { connect } from 'react-redux';

export class StoryLog extends Component {

  componentDidMount(){
    this.props.setIdList()
  }
  
  render() {
    const {getIdList} = this.props
    return (
      <div id="log-box">
        {getIdList.map(elem =>(
          <Story id={elem.id} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    getIdList: state.storyReducer.storyIdList
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setIdList: () => {
      dispatch({ type: 'SPINNER_START_LOAD' })
      fetchAPI('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty').then(data => {
        let idList = []
        data[0].slice(0, 30).map(elem=>{
          idList = idList.concat({id: elem, points: 0})
        })
        dispatch({
          type: 'ADD_STORY_IDLIST',
          payload: {
            storyIdList: idList
          }
        })
        dispatch({ type: 'SPINNER_STOP_LOAD' })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryLog);