import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { database } from '../firebase';
import Header from './Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    database.ref().on('value', (snapshot) => {
      this.setState({
        data: JSON.stringify(snapshot.val()),
      });
    });
  }

  render() {
    const { data } = this.state;
    const { Fragment } = React;
    return (
      <MuiThemeProvider>
        <Fragment>
          <Header />
          <RaisedButton label="Default" />
          { data }
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;
