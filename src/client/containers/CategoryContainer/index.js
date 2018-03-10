import React, { Component } from 'react';
import { AppBar, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { CategoryOrdersStyled } from './styles';
import CategoryList from '../../components/CategoryList';
import CategoriesFixture from '../../fixtures/categories';

class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.styles = {
      title: {
        cursor: 'pointer'
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <AppBar
          title={<span style={this.styles.title}>Back to Tables</span>}
          onTitleClick={this.handleClick}
          iconElementLeft={
            <IconButton>
              <Link to="/">
                <ArrowBack style={{ color: '#fff' }} />
              </Link>
            </IconButton>
          }
        />
        <CategoryOrdersStyled>
          <CategoryList list={CategoriesFixture} />
        </CategoryOrdersStyled>
      </div>
    );
  }
}

CategoryContainer.propTypes = {
  history: PropTypes.shape(PropTypes.object).isRequired
};

export default withRouter(CategoryContainer);
