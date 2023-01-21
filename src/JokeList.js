import axios from 'axios';
import React, { Component } from 'react';
import './JokeList.css';

const BASE_ENDPOINT = 'https://icanhazdadjoke.com/';

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };

  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
    };
  }

  async componentDidMount() {
    let reqInstance = axios.create({
      headers: {
        Accept: 'application/json',
      },
    });

    const jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let res = await reqInstance.get(BASE_ENDPOINT);
      jokes.push(res.data);
    }
    this.setState({ jokes: jokes });
  }

  renderedJokes() {
    return this.state.jokes.map((j) => <div>{j.joke}</div>);
  }

  render() {
    return (
      <div className='JokeList'>
        <div className='JokeList-sidebar'>
          <h1>
            <span>Dad</span> Jokes
          </h1>
          <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
          <button>New Jokes</button>
        </div>
        <div className='JokeList-jokes'>{this.renderedJokes()}</div>
      </div>
    );
  }
}

export default JokeList;
