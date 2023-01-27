import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './Joke.css';

const MAX_VOTE_NUM = 10;
const MIN_VOTE_NUM = -10;

class Joke extends Component {
  getEmoji(votes) {
    if (votes === 0 || votes === 1 || votes === 2) {
      return 'em em-neutral_face';
    }
    if (votes === 3 || votes === 4) {
      return 'em em-smiley';
    }
    if (votes === 5 || votes === 6) {
      return 'em em-smile';
    }
    if (votes === 7 || votes === 8) {
      return 'em em-laughing';
    }
    if (votes >= 9) {
      return 'em em-rolling_on_the_floor_laughing';
    }
    if (votes <= -1 && votes >= -3) {
      return 'em em-woozy_face';
    }
    if (votes <= -4 && votes >= -6) {
      return 'em em-expressionless';
    }
    if (votes <= -7) {
      return 'em em-angry';
    }
  }

  getColor(votes) {
    if (votes === 0 || votes === 1 || votes === 2) {
      return 'gray';
    }
    if (votes === 3 || votes === 4) {
      return 'lightgreen';
    }
    if (votes === 5 || votes === 6) {
      return 'lightgreen';
    }
    if (votes === 7 || votes === 8) {
      return 'darkgreen';
    }
    if (votes >= 9) {
      return 'darkgreen';
    }
    if (votes <= -1 && votes >= -3) {
      return 'orange';
    }
    if (votes <= -4 && votes >= -6) {
      return 'darkorange';
    }
    if (votes <= -7) {
      return 'red';
    }
  }

  render() {
    let downvoteDisabled = this.props.votes === MIN_VOTE_NUM;
    let upvoteDisabled = this.props.votes === MAX_VOTE_NUM;

    return (
      <div className='Joke'>
        <div className='Joke-voteline'>
          <button
            onClick={this.props.upvote}
            disabled={upvoteDisabled}
            className='vote-btn upvote-btn'
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <span
            style={{
              borderColor: `${this.getColor(this.props.votes)}`,
            }}
          >
            {this.props.votes}
          </span>
          <button
            onClick={this.props.downvote}
            disabled={downvoteDisabled}
            className='vote-btn downvote-btn'
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div className='Joke-text'>{this.props.text}</div>
        <div className='Joke-smiley'>
          <i className={this.getEmoji(this.props.votes)}></i>
        </div>
      </div>
    );
  }
}

export default Joke;
