import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  AccordionStyled,
  AccordionText,
  AccordionTitle,
  AccordionTextInner,
  Expander,
  AccordionHeader,
} from './Accordion.styled';
import Typography from '../typography/Typography';

const Accordion = ({ title, text }) => {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }

  return (
    <AccordionStyled>
      <AccordionHeader onClick={toggle}>
        <AccordionTitle>{title}</AccordionTitle>
        <Expander onClick={toggle} open={open} />
      </AccordionHeader>
      <AccordionText open={open}>
        <AccordionTextInner>
          <Typography>{text}</Typography>
        </AccordionTextInner>
      </AccordionText>
    </AccordionStyled>
  );
};

Accordion.propTyped = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Accordion;
