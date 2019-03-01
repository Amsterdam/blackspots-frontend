import { createGlobalStyle } from "styled-components";

import AvenirLTStdHeavy from "assets/fonts/AvenirLTStd-Heavy.otf";
import AvenirLTStdRoman from "assets/fonts/AvenirLTStd-Roman.otf";

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

  h1 {
    width: 232px;
    height: 33px;
    font-family: ${props => {
      return props.theme.fontFamily.avenirHeavy;
    }};
    font-size: 30px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.1;
    letter-spacing: normal;
    color: ${props => props.theme.colors.black};
  }

  h2 {
    height: 37px;
    font-family: ${props => {
      return props.theme.fontFamily.avenirHeavy;
    }};
    font-size: 28px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.32;
    letter-spacing: normal;
    color: ${props => props.theme.colors.black};
  }

  h3 {
    height: 30px;
    font-family: ${props => {
      return props.theme.fontFamily.avenirHeavy;
    }};
    font-size: 25px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.2;
    letter-spacing: normal;
    color: ${props => props.theme.colors.black};
  }

  h4 {
    height: 25px;
    font-family: ${props => {
      return props.theme.fontFamily.avenirHeavy;
    }};
    font-size: 20px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.25;
    letter-spacing: normal;
    color: ${props => props.theme.colors.black};
  }

  h5 {
    height: 23px;
    font-family: ${props => {
      return props.theme.fontFamily.avenirHeavy;
    }};
    font-size: 18px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.28;
    letter-spacing: normal;
    color: ${props => props.theme.colors.black};
  }

  h6 {
    height: 24px;
    font-family: ${props => {
      return props.theme.fontFamily.avenirRoman;
    }};
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: ${props => props.theme.colors.black};
  }

  a {
    color: ${props => props.theme.colors.black};
    text-decoration-line: none;

    &:hover {
      color: ${props => props.theme.colors.red};
      text-decoration-line: underline;
      cursor: pointer;
    }

    &:hover h1, &:hover h2, &:hover h3, &:hover h4, &:hover h5, &:hover h6 {
      color: ${props => props.theme.colors.red};
    }

    &.active {
    text-decoration-line: underline !important;
    text-decoration-color: red !important;
  }
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
