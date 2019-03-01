import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LinkStyled = styled.span`
  height: 20px;
  width: 118px;
  color: #004699;
  font-size: 16px;
  font-weight: 900;
  line-height: 20px;
`;

export default props => {
  return (
    <Link to="/">
      <LinkStyled>{`${props.chevDirection === "left" ? "<" : ">"} ${
        props.text
      }`}</LinkStyled>
    </Link>
  );
};
