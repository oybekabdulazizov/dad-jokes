import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

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
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <span>{this.props.votes}</span>
          <button onClick={this.props.downvote} disabled={downvoteDisabled}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div>{this.props.text}</div>
      </div>
    );
  }
}

export default Joke;
