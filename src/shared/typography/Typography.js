import PropTypes from "prop-types";
import styled from "styled-components";

const Typography = styled.p`
  color: ${props => props.theme.colors.black};
  font-family: ${props => {
    return props.theme.fontFamily.avenirRoman;
  }};
  font-size: ${props => {
    switch (props.size) {
      case "L":
        return "18px";
      case "M":
        return "16px;";
      default:
        return null;
    }
  }};
  line-height: ${props => {
    switch (props.size) {
      case "L":
        return "26px";
      case "M":
        return "24px;";
      default:
        return null;
    }
  }};
  margin-bottom: 40px;
`;

Typography.propTypes = {
  size: PropTypes.oneOf(["L", "M"])
};

Typography.defaultProps = {
  size: "M"
};

export default Typography;
