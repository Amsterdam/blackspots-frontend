import styled from "styled-components";

export default styled.p`
	height: 78px;
	width: 620px;
	color: ${props => props.theme.colors.black};
  font-family: ${props => {
    return props.theme.fontFamily.avenirRoman;
  }};
  font-size: 18px;
	line-height: 26px;
}
`;
