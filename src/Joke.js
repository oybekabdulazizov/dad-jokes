import React, { Component } from 'react';

const MAX_VOTE_NUM = 10;
const MIN_VOTE_NUM = -10;

class Joke extends Component {
  render() {
    let downvoteDisabled = this.props.votes === MIN_VOTE_NUM;
    let upvoteDisabled = this.props.votes === MAX_VOTE_NUM;
    return (
      <div>
        <div>
          <button onClick={this.props.upvote} disabled={upvoteDisabled}>
            Upvote
          </button>
          <span>{this.props.votes}</span>
          <button onClick={this.props.downvote} disabled={downvoteDisabled}>
            Downvote
          </button>
        </div>
        <div>{this.props.text}</div>
      </div>
    );
  }
}

export default Joke;
