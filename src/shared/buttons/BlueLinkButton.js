import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LinkStyled = styled.span`
  height: 20px;
  width: 118px;
  color: #004699;
  font-size: 16px;
  font-weight: 900;
  line-height: 20px;
`;

const BlueLinkButton = props => {
  return (
    <LinkStyled>{`${props.chevDirection === "left" ? "<" : ">"} ${
      props.text
    }`}</LinkStyled>
  );
};

BlueLinkButton.propTypes = {
  chevDirection: PropTypes.oneOf(["left", "right"]),
  text: PropTypes.string.isRequired
};

BlueLinkButton.defaultProps = {
  chevDirection: "left"
};

export default BlueLinkButton;
