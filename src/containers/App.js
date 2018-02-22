import React, { Component } from 'react';
import { abc } from '../test';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Hello world',
    };
  }

  render() {
    const { Fragment } = React;
    const { text } = this.state;
    const AfterEffects = false;
    return (
      <Fragment>
        {text} {abc} {AfterEffects}
      </Fragment>
    );
  }
}

export default App;
