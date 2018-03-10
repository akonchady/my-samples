import React, { Component } from 'react';
import { uniqueId } from 'lodash';

import { TABLE_COUNT } from '../../constants/tables';
import { TableStyled, TablesContainerStyled, TableTextStyled } from './styles';

class TablesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // eslint-disable-next-line class-methods-use-this
  renderTable(index) {
    return (
      <TableStyled key={uniqueId('table')}>
        <img src="client/images/icons/table2.png" alt={`Table ${index}`} />
        <TableTextStyled className="center">Table {index}</TableTextStyled>
      </TableStyled>
    );
  }

  renderTableLayout() {
    const collection = [];
    for (let i = 1; i <= TABLE_COUNT; i += 1) {
      collection.push(this.renderTable(i));
    }
    return collection;
  }

  render() {
    return <TablesContainerStyled>{this.renderTableLayout()}</TablesContainerStyled>;
  }
}

export default TablesContainer;
