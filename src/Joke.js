import React, { Component } from 'react';

class Joke extends Component {
  render() {
    return (
      <div>
        <button>Up</button>
        <p>{this.props.votes}</p>
        <button>Down</button>
        <div>{this.props.joke}</div>
        <icon>LOL</icon>
      </div>
    );
  }
}

export default Joke;
