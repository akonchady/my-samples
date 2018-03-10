import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route } from 'react-router-dom';

import Home from './Home';
import CategoryContainer from './CategoryContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // Webpack magic comment to generate the chunk name
    // import(/* webpackChunkName: "firebase" */ '../firebase').then(module => {
    //   const { database } = module;
    //   database.ref().on('value', snapshot => {
    //     this.setState({
    //       data: JSON.stringify(snapshot.val())
    //     });
    //   });
    // });
  }

  render() {
    const { Fragment } = React;
    return (
      <MuiThemeProvider>
        <Fragment>
          <Route path="/" component={Home} />
          <Route path="/categories" component={CategoryContainer} />
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;
