import PropTypes from 'prop-types';
import styled from 'styled-components';
import { styles, themeColor, themeSpacing } from '@amsterdam/asc-ui';
import { Button } from '@amsterdam/asc-ui';

export const StyledUploadButton = styled.div`
  position: relative;
  cursor: pointer;

  & > input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  & > input:focus + label {
    outline-color: ${themeColor('support', 'focus')};
    outline-style: solid;
    outline-offset: 0px;
    outline-width: 3px;
  }

  /* TODO (WK-209) ${styles.SpinnerStyle} { */
  .spinner {
    margin-right: ${themeSpacing(3)};
  }
`;

const UploadButton = ({ id, onChange, children, ...otherProps }) => {
  return (
    <StyledUploadButton {...otherProps}>
      <input type="file" id={id} onChange={onChange} />
      <Button variant="primary" $as="label" htmlFor={id}>
        {children}
      </Button>
    </StyledUploadButton>
  );
};

UploadButton.propTypes = {
  id: PropTypes.string,
  children: PropTypes.element,
  onChange: PropTypes.func,
};

export default UploadButton;
