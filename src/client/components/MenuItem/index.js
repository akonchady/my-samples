import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@material-ui/core';

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
    return (
      <Card onClick={this.handleClick}>
        <CardContent>{menuItem.name}</CardContent>
      </Card>
    );
  }
}

MenuItem.propTypes = {
  onClick: PropTypes.func,
  menuItem: PropTypes.shape({})
};

export default MenuItem;
