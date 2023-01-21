import axios from 'axios';
import React, { Component } from 'react';

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
        <h1>Joke List</h1>
        <div className='JokeList-jokes'>{this.renderedJokes()}</div>
      </div>
    );
  }
}

export default JokeList;
