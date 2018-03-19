import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui';

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
        <CardText>
          {orderItem.name} {orderItem.count}
        </CardText>
      </Card>
    );
  }
}

OrderItem.propTypes = {
  onClick: PropTypes.func,
  orderItem: PropTypes.shape({})
};

export default OrderItem;
