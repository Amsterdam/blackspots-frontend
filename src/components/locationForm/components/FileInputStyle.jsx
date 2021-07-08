import { styles, themeColor, themeSpacing } from '@amsterdam/asc-ui';
import styled from 'styled-components';

export const FileNameStyle = styled.span`
  display: inline-block;
  background-color: ${themeColor('tint', 'level2')};
  cursor: auto;
  font-weight: 500;
  max-width: 100%;
  height: ${themeSpacing(10)};
  letter-spacing: normal;
  line-height: ${themeSpacing(10)};
  margin-bottom: ${themeSpacing(1)};
  padding: ${themeSpacing(0, 11, 0, 4)};
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  /* TODO (WK-209) & > ${styles.ButtonStyle} { */
  & > .closeButton {
    position: absolute;
    right: 3px;
    top: 3px;
    background-color: ${themeColor('tint', 'level2')};
  }
`;

export const FileInputStyle = styled.div`
  width: 100%;
`;

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
