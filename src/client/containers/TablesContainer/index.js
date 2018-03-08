import React, { Component } from 'react';
import { TABLE_COUNT } from '../../constants/tables';

class TablesContainer extends Component {
  static renderTable() {
    return (
      <div style={{ flex: '1 1 100%' }}>
        <img src="client/images/icons/table.png" alt="Table 1" />
        Table 1
      </div>
    );
  }

  static renderTableLayout() {
    const collection = [];
    for (let i = 0; i < TABLE_COUNT; i += 1) {
      collection.push(TablesContainer.renderTable());
    }
    return collection;
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div style={{ display: 'flex' }}>{TablesContainer.renderTableLayout()}</div>;
  }
}

export default TablesContainer;
