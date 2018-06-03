import React, { Fragment, PureComponent } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import TablesContainer from '../TablesContainer';
import { Headline } from './styles';

function handleActive(tab) {
  alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 'tables'
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <Fragment>
        <Tabs value={value} onChange={this.handleChange}>
          <Tab label="Tables" value="tables" />
          <Tab label="Open" value="openTables" />
          <Tab label="onActive" data-route="/home" onActive={handleActive} value="billing" />
        </Tabs>
        {value === 'tables' && (
          <div>
            <Headline>
              Hello! Start selecting tables{' '}
              <span role="img" aria-label="smiley">
                😀
              </span>
            </Headline>
            <TablesContainer />
          </div>
        )}
        {value === 'openTables' && (
          <div>
            <Headline>Tab Two</Headline>
            <p>This is another example tab.</p>
          </div>
        )}
        {value === 'billing' && (
          <div>
            <Headline>Tab Three</Headline>
            <p>This is a third example tab.</p>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Home;
