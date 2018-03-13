import React from 'react';
import PropTypes from 'prop-types';

const ItemList = ({ list, render }, ...restProps) => (
  <div {...restProps}>{list.map(item => render(item))}</div>
);

ItemList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func,
  render: PropTypes.func
};

export default ItemList;
