import React, { Component } from 'react';
import { AppBar, IconButton } from 'material-ui';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-styled-flexboxgrid';
import { uniqueId } from 'lodash';

import { StyledCategoryOrders, StyledArrowBack, StyledTitle } from './styles';
import CategoriesFixture from '../../fixtures/categories';
import MenuItemsFixture from '../../fixtures/menuItems';
import { ItemList, CategoryItem, MenuItem, OrderItem } from '../../components';

class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
    this.styles = {
      title: {
        cursor: 'pointer'
      }
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  handleMenuItemClick(menuItem) {
    const { orders } = this.state;
    const newOrders = [...orders];
    newOrders.push(menuItem);
    this.setState({
      orders: newOrders
    });
  }

  render() {
    const { orders } = this.state;
    return (
      <div>
        <AppBar
          title={<StyledTitle>Back to Tables</StyledTitle>}
          onTitleClick={this.handleClick}
          iconElementLeft={
            <IconButton>
              <Link to="/">
                <StyledArrowBack />
              </Link>
            </IconButton>
          }
        />
        <StyledCategoryOrders>
          <Row>
            <Col xs={6}>
              <ItemList
                list={CategoriesFixture}
                render={category => <CategoryItem key={uniqueId()} category={category} />}
              />

              <hr />

              <ItemList
                list={MenuItemsFixture}
                render={menuItem => (
                  <MenuItem
                    key={uniqueId()}
                    menuItem={menuItem}
                    onClick={this.handleMenuItemClick}
                  />
                )}
              />
            </Col>
            <Col xs={6}>
              {orders && (
                <ItemList
                  list={orders}
                  render={order => <OrderItem key={uniqueId()} orderItem={order} />}
                />
              )}
            </Col>
          </Row>
        </StyledCategoryOrders>
      </div>
    );
  }
}

CategoryContainer.propTypes = {
  history: PropTypes.shape({})
};

export default withRouter(CategoryContainer);
