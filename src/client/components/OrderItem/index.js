import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@material-ui/core';

class OrderItem extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onClick, orderItem } = this.props;
    if (onClick) {
      onClick(orderItem);
    }
  }

  render() {
    const { orderItem } = this.props;
    return (
      <Card onClick={this.handleClick}>
        <CardContent>
          {orderItem.name} {orderItem.count}
        </CardContent>
      </Card>
    );
  }
}

OrderItem.propTypes = {
  onClick: PropTypes.func,
  orderItem: PropTypes.shape({})
};

export default OrderItem;
