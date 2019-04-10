import { createGlobalStyle } from 'styled-components';

import AvenirLTStdHeavy from 'assets/fonts/AvenirLTStd-Heavy.otf';
import AvenirLTStdRoman from 'assets/fonts/AvenirLTStd-Roman.otf';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: ${props => {
      return props.theme.fontFamily.avenirRoman;
    }};
  }

  a {
    color: ${props => props.theme.colors.primaryBlack};
    text-decoration-line: none;

    &:hover {
      color: ${props => props.theme.colors.primaryRed};
      text-decoration-line: underline;
      cursor: pointer;
    }

    &:hover h1, &:hover h2, &:hover h3, &:hover h4, &:hover h5, &:hover h6 {
      color: ${props => props.theme.colors.primaryRed};
    }
  }

  b {
    font-weight: 400;
  }

  @font-face {
    font-family: 'AvenirLTStd-Roman';
    src: url(${AvenirLTStdRoman})
  }
  @font-face {
    font-family: 'AvenirLTStd-Heavy';
    src: url(${AvenirLTStdHeavy})
  }
`;

export default GlobalStyle;
