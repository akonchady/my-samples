import React, { Component } from 'react';
// import { TABLE_COUNT } from '../../constants/tables';

class TablesContainer extends Component {
  static renderTable() {
    return (
      <div style={{ flex: '1 1 0' }}>
        <img src="client/images/icons/table.png" alt="Table 1" />
        Table 1
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div style={{ display: 'flex' }}>{TablesContainer.renderTable()}</div>;
  }
}

export default TablesContainer;
