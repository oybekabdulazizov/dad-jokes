import axios from 'axios';
import React, { Component } from 'react';
import Joke from './Joke';
import './JokeList.css';

const BASE_ENDPOINT = 'https://icanhazdadjoke.com/';

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };

  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
    };
    this.handleLoadMoreJokes = this.handleLoadMoreJokes.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  }

  async getJokes() {
    console.log('inside getJokes function...');
    let reqInstance = axios.create({
      headers: {
        Accept: 'application/json',
      },
    });

    const jokes = [];

    while (jokes.length < this.props.numJokesToGet) {
      let res = await reqInstance.get(BASE_ENDPOINT);
      jokes.push({ text: res.data.joke, id: res.data.id, votes: 0 });
    }

    this.setState(
      (currState) => ({
        jokes: [...currState.jokes, ...jokes],
      }),
      () =>
        window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
  }

  handleVote(id, change) {
    this.setState(
      (currState) => ({
        jokes: currState.jokes.map((j) =>
          j.id === id ? { ...j, votes: j.votes + change } : j
        ),
      }),
      () =>
        window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
  }

  handleLoadMoreJokes() {
    console.log('inside the handleLoadMoreJokes function...');
    this.getJokes();
  }

  renderedJokes() {
    return this.state.jokes.map((j) => (
      <Joke
        text={j.text}
        id={j.id}
        key={j.id}
        votes={j.votes}
        upvote={() => this.handleVote(j.id, 1)}
        downvote={() => this.handleVote(j.id, -1)}
      />
    ));
  }

  render() {
    return (
      <div className='JokeList'>
        <div className='JokeList-sidebar'>
          <h1>
            <span>Dad</span> Jokes
          </h1>
          <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
          <button onClick={this.handleLoadMoreJokes}>New Jokes</button>
        </div>
        <div className='JokeList-jokes'>{this.renderedJokes()}</div>
      </div>
    );
  }
}

export default JokeList;
