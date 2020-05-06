import React, { Component } from 'react';
import Comment from './Comment';

export default class CommentLog extends Component {
  
  render() {
    const {idComments} = this.props
    return (
      <div>
        {idComments.map(id =>(
          <Comment id={id} />
        ))}
      </div>
    );
  }
}