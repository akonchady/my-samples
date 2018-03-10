import React, { PureComponent } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import TablesContainer from '../TablesContainer';
import { Headline } from './styles';

function handleActive(tab) {
  alert(`A tab with this route property ${tab.props['data-route']} was activated.`); // eslint-disable-line
}

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Tabs>
        <Tab label="Tables">
          <div>
            <Headline>
              Hello! Start selecting tables{' '}
              <span role="img" aria-label="smiley">
                😀
              </span>
            </Headline>
            <TablesContainer />
          </div>
        </Tab>
        <Tab label="Open">
          <div>
            <Headline>Tab Two</Headline>
            <p>This is another example tab.</p>
          </div>
        </Tab>
        <Tab label="onActive" data-route="/home" onActive={handleActive}>
          <div>
            <Headline>Tab Three</Headline>
            <p>This is a third example tab.</p>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

export default Home;
