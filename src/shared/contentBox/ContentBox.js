import React from "react";
import styled from "styled-components";

const ContentBoxStyled = styled.div`
  width: 940px;
  margin: 0 0 0 100px;
  padding: 20px 0 0 0;
`;

export default props => {
  return <ContentBoxStyled>{props.children}</ContentBoxStyled>;
};
