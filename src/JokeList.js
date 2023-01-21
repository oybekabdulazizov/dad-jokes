import React, { Component } from 'react';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [
        {
          id: 't1nv2jr20dc',
          joke: 'I used to be addicted to the hokey pokey, but I turned myself around.',
        },
        {
          id: 'k2onmn1n22r',
          joke: 'Some people say that comedians who tell one too many light bulb jokes soon burn out, but they do not know watt they are talking about. They are not that bright.',
        },
      ],
    };
  }

  renderedJokes() {
    return this.state.jokes.map((j) => <h3>{j.joke}</h3>);
  }

  render() {
    return (
      <div>
        <h1>Joke List</h1>
        {this.renderedJokes()}
      </div>
    );
  }
}

export default JokeList;
