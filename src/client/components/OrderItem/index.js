import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Chip } from 'material-ui';

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
      <Chip onClick={this.handleClick}>
        {orderItem.name} {orderItem.count}
      </Chip>
    );
  }
}

OrderItem.propTypes = {
  onClick: PropTypes.func,
  orderItem: PropTypes.shape({})
};

export default OrderItem;
