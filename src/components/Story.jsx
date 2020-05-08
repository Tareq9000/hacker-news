import React, { Component } from 'react';
import CommentLog from './CommentLog';
import { fetchAPI } from '../fetchAPI'
import { getLink, getLinkUrl, convertTime } from '../convertMethods'
import { connect } from 'react-redux';
import styles from '../styles/style.module.css';

export class Story extends Component {
  
  componentDidMount(){
    this.props.setStory()
  }

  render() {
    const { showKids, showComment, url, linkUrl, score, by, time, kids, title, link, haveKids } = this.props

    return  by ? (
      <div className={styles.story_box}>
        <div className={styles.story_title}>
          <a className={styles.story_url+' '+styles.story} href={url} target="_blank">{title}</a>
          <a className={styles.story_link+' '+styles.story} href={linkUrl} target="_blank">{link}</a>
        </div>
        <div className={styles.story_score+' '+styles.story}>{score} points</div>
        <div className={styles.story_by+' '+styles.story}>by: {by}</div>
        <div className={styles.story_time+' '+styles.story}>{time}</div>
        {
          haveKids &&
          <a className={styles.show_comments} onClick={showKids}>{showComment ? <div>&#708;</div> : <div>&#709;</div>}</a>
        }
        {
          showComment && (
            <div className={styles.kids_box}>
              <CommentLog idComments={kids}/>
            </div>
          )
        }
      </div>
    ) : null
  }
}

const mapStateToProps = ( state, ownProps ) => {
  const currentStory =  state.storyReducer.storyList.find( elem => ownProps.id == elem.id);
  return {
    url : currentStory && currentStory.url,
    linkUrl : currentStory && currentStory.linkUrl,
    score : currentStory && currentStory.score,
    by : currentStory && currentStory.by,
    time : currentStory && currentStory.time,
    kids :  currentStory && currentStory.kids,
    title: currentStory && currentStory.title,
    link: currentStory && currentStory.link,
    haveKids : currentStory && currentStory.haveKids,
    showComment: Boolean(currentStory && currentStory.showComment)
  }
}

const mapDispatchToProps = ( dispatch, ownProps ) => {
  return {
    setStory: () => {
      dispatch({ type: 'SPINNER_START_LOAD' })
      fetchAPI('https://hacker-news.firebaseio.com/v0/item/'+ownProps.id+'.json?print=pretty').then(data => {
        let haveKids = false
        let kids = []
        if(data[0].kids != undefined){
          haveKids = true
          kids = data[0].kids
        }
        dispatch({
          type: 'ADD_STORY',
          payload:{
            story: {
              title: data[0].title,
              by: data[0].by,
              time: convertTime(data[0].time),
              score: data[0].score,
              url: data[0].url,
              link: getLink(data[0].url),
              linkUrl: getLinkUrl(data[0].url),
              id: data[0].id,
              kids: kids,
              showComment: false,
              haveKids: haveKids   
            }
          }
        })
        dispatch({ type: 'SPINNER_STOP_LOAD' })
      })
    },
    showKids: () => {
      dispatch({
        type: 'SHOW_STORY_KIDS',
        payload: {
          storyId: ownProps.id
        } 
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Story)
