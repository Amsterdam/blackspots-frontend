import { string, func } from 'prop-types';
import styled, { css } from 'styled-components';
import { Input } from '@amsterdam/asc-ui';

const StyledInput = styled(Input)`
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `}
`;

const TextAreaInput = ({ name, value, onChange, ...otherProps }) => {
  return (
    <StyledInput
      as="textarea"
      name={name}
      value={value || ''}
      data-testid={`${name}-test-id`}
      {...otherProps}
      onChange={onChange}
    />
  );
};

TextAreaInput.defaultProps = {
  value: '',
};

TextAreaInput.propTypes = {
  name: string.isRequired,
  value: string,
  onChange: func.isRequired,
};

export default TextAreaInput;
