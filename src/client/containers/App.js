import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';

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
          <Header />
          {/* <RaisedButton label="Default" /> */}
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;
