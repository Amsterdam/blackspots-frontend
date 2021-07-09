import styled from 'styled-components';

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

export default TextWithOverflow;
