import React, { Component } from 'react';

const MAX_VOTE_NUM = 10;
const MIN_VOTE_NUM = -10;

class Joke extends Component {
  render() {
    return (
      <div>
        <div>
          <button
            onClick={this.props.upvote}
            disabled={this.props.votes === MAX_VOTE_NUM}
          >
            Upvote
          </button>
          <span>{this.props.votes}</span>
          <button
            onClick={this.props.downvote}
            disabled={this.props.votes === MIN_VOTE_NUM}
          >
            Downvote
          </button>
        </div>
        <div>{this.props.joke}</div>
      </div>
    );
  }
}

export default Joke;
