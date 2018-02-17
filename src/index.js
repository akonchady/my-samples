import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { abc } from './test';

class Container extends Component {
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

ReactDOM.render(<Container />, document.getElementById('container')); // eslint-disable-line no-undef

/*
function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = join(['Hello', 'webpack'], ' ');

  return element;
}

const obj = {
  a: {
    b: {
      c: {
        d: 2
      }
    }
  }
}

document.body.appendChild(component());
*/
