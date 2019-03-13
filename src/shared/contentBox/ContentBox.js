import React from "react";
import styled from "styled-components";

const ContentBoxStyled = styled.div`
  height: 100%;
  width: 940px;
  padding: 20px 100px 20px 100px;
`;

export default props => {
  return <ContentBoxStyled>{props.children}</ContentBoxStyled>;
};
