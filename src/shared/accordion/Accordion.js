import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AccordionStyled,
  AccordionText,
  AccordionTitle,
  AccordionTextInner,
  Expander,
  AccordionHeader
} from "./Accordion.styled";

const Accordion = ({ title, text }) => {
  const [open, setOpen] = useState(false);

  return (
    <AccordionStyled>
      <AccordionHeader>
        <AccordionTitle>{title}</AccordionTitle>
        <Expander onClick={() => setOpen(!open)} open={open} />
      </AccordionHeader>
      <AccordionText open={open}>
        <AccordionTextInner>{text}</AccordionTextInner>
      </AccordionText>
    </AccordionStyled>
  );
};

Accordion.propTyped = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Accordion;
