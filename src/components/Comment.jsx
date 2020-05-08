import React, { Component } from 'react';
import { fetchAPI } from '../fetchAPI'
import { getLink, getLinkUrl, convertTime } from '../convertMethods'
import { connect } from 'react-redux';
import htmlToText from 'html-to-text';
import CommentLog from './CommentLog';
import styles from '../styles/style.module.css';

export class Comment extends Component {

  componentDidMount(){
    this.props.setComment()
  }

  render() {
    const { showKids, by, time, kids, text, haveKids, showComment } = this.props

    return by ? (
      <div className={styles.comment_box}>
        <div className={styles.story_by+' '+styles.story}>by: {by}</div>
        <div className={styles.story_time+' '+styles.story}>{time}</div>
        <div className={styles.comment_text+' '+styles.story}>{text} points</div>
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
  let currentComment = state.commentReducer.commentList.find( elem => ownProps.id == elem.id)

  return {
    by : currentComment && currentComment.by,
    time : currentComment && currentComment.time,
    kids :  currentComment && currentComment.kids,
    text: currentComment && currentComment.text,
    haveKids : currentComment && currentComment.haveKids,
    showComment: Boolean(currentComment && currentComment.showComment)
  }
}
const mapDispatchToProps = ( dispatch, ownProps ) => {
  return {
    setComment: () => {
      dispatch({ type: 'SPINNER_START_LOAD' })
      fetchAPI('https://hacker-news.firebaseio.com/v0/item/'+ownProps.id+'.json?print=pretty').then(data => {
        let kids = []
        let haveKids = false
        if(data[0].kids != undefined){
          haveKids = true
          kids = data[0].kids
        }
        dispatch({
          type: 'ADD_COMMENT',
          payload:{
            comment: {
              by: data[0].by,
              time: convertTime(data[0].time),
              id: data[0].id,
              text: htmlToText.fromString(data[0].text, {
                wordwrap: 500
              }),
              showComment: false,
              haveKids: haveKids,
              kids
            }
          }
        })
        dispatch({ type: 'SPINNER_STOP_LOAD' })
      })
    },
    showKids: () => {
      dispatch({
        type: 'SHOW_COMMENT_KIDS',
        payload: {
          commentId: ownProps.id
        } 
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)