import styled from 'styled-components';
import PropTypes from 'prop-types';

const TextWithOverflowStyle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TextWithOverflow = ({ children, ...otherProps }) => (
  <TextWithOverflowStyle title={children} {...otherProps}>
    {children}
  </TextWithOverflowStyle>
);

TextWithOverflow.propTypes = {
  children: PropTypes.element,
};

export default TextWithOverflow;
