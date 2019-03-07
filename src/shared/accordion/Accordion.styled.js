import styled from "styled-components";

export const AccordionStyled = styled.div`
  width: 100%;
  background-color: #e5e5e5;
  border: solid 2px #e5e5e5;
`;

export const AccordionText = styled.div`
  height: ${props => (props.open ? "100px" : "0px")};
  transition: height 0.3s ease-out;
  overflow: hidden;
`;

export const AccordionTextInner = styled.div`
  background-color: white;
  padding: 12px 17px 12px 17px;
  height: 100%;
`;

export const AccordionTitle = styled.div`
  height: 21px;
  color: #000000;
  font-family: ${props => props.theme.fontFamily.avenirHeavy};
  font-size: 18px;
  font-weight: 900;
  line-height: 21px;
  padding: 17px;
`;

export const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Expander = styled.button`
  width: 30px;
  height: 30px;
  background-color: #e5e5e5;
  margin: 12px;
  text-align: center;
  border: none;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    margin: 5px 4px 3px -5px;
    border-right: 2px solid black;
    border-bottom: 2px solid black;
    transform: rotate(${props => (props.open ? "-135deg" : "-315deg")});
    transition: transform 0.3s ease-out;
    top: 3px;
    display: inline-block;
  }
`;
