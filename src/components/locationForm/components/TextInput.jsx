import styled, { css } from 'styled-components';
import { Input } from '@amsterdam/asc-ui';
import PropTypes from 'prop-types';

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

const TextInput = ({ name, value, onChange, ...otherProps }) => {
  return (
    <StyledInput
      name={name}
      type="text"
      value={value || ''}
      data-testid={`${name}-test-id`}
      {...otherProps}
      onChange={onChange}
    />
  );
};

TextInput.defaultProps = {
  value: '',
};
TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

export default TextInput;
