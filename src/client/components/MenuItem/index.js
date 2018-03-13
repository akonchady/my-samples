import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Chip } from 'material-ui';

class MenuItem extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onClick, menuItem } = this.props;
    if (onClick) {
      onClick(menuItem);
    }
  }

  render() {
    const { menuItem } = this.props;
    return <Chip onClick={this.handleClick}>{menuItem.name}</Chip>;
  }
}

MenuItem.propTypes = {
  onClick: PropTypes.func,
  menuItem: PropTypes.shape({})
};

export default MenuItem;
