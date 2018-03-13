import styled from 'styled-components';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const StyledCategoryOrders = styled.div`
  padding: 10px;
`;

const StyledArrowBack = styled(ArrowBack)`
  color: #fff !important;
`;

const StyledTitle = styled.span`
  cursor: pointer;
`;

export { StyledCategoryOrders, StyledArrowBack, StyledTitle };
