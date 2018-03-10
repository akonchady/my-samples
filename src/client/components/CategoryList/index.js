import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { Chip } from 'material-ui';

const CategoryList = ({ list }, ...restProps) => (
  <div>
    {list.map(category => (
      <Chip key={uniqueId()} {...restProps}>
        {category.name}
      </Chip>
    ))}
  </div>
);

CategoryList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CategoryList;
