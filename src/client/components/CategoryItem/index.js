import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';

class CategoryItem extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onClick, category } = this.props;
    if (onClick) {
      onClick(category);
    }
  }

  render() {
    const { onClick, category } = this.props;
    return <Chip onClick={onClick} label={category.name} />;
  }
}

CategoryItem.propTypes = {
  onClick: PropTypes.func,
  category: PropTypes.shape({})
};

export default CategoryItem;
