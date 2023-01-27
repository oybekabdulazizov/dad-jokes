import axios from 'axios';
import React, { Component } from 'react';
import Joke from './Joke';
import './JokeList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceLaughBeam } from '@fortawesome/free-solid-svg-icons';

const BASE_ENDPOINT = 'https://icanhazdadjoke.com/';

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };

  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
      loading: false,
    };
    this.fetchedJokesIDs = new Set(this.state.jokes.map((j) => j.id));
    this.handleLoadMoreJokes = this.handleLoadMoreJokes.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();

    if (this.state.jokes.length > 0) {
      this.setState((currState) => ({
        jokes: currState.jokes.sort((a, b) => b.votes - a.votes),
      }));
    }
  }

  async getJokes() {
    try {
      const jokes = [];
      while (jokes.length < this.props.numJokesToGet) {
        let res = await axios.get(BASE_ENDPOINT, {
          headers: { Accept: 'application/json' },
        });
        let newJoke = res.data;
        if (!this.fetchedJokesIDs.has(newJoke.id)) {
          jokes.push({ text: newJoke.joke, id: newJoke.id, votes: 0 });
          this.fetchedJokesIDs.add(newJoke.id);
        }
      }

      this.setState(
        (currState) => ({
          loading: false,
          jokes: [...currState.jokes, ...jokes],
        }),
        () =>
          window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
      );
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
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
    this.setState({ loading: true }, this.getJokes);
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
      <>
        {this.state.loading ? (
          <div className='JokeList-spinner'>
            <FontAwesomeIcon icon={faFaceLaughBeam} className='spinner' />
            <h1>LOADING...</h1>
          </div>
        ) : (
          <>
            <div className='JokeList'>
              <div className='JokeList-sidebar'>
                <h1>
                  <span>Dad</span> Jokes
                </h1>
                <img
                  src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg'
                  alt='JokeList-sidebar-laughing-emoji'
                />
                <button onClick={this.handleLoadMoreJokes}>New Jokes</button>
              </div>
              <div className='JokeList-jokes'>{this.renderedJokes()}</div>
            </div>
          </>
        )}
      </>
    );
  }
}

export default JokeList;
