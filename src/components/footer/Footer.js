import React from 'react';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.Container}>
      <h3>Disclaimer</h3>
      <p>
        De Gemeente Amsterdam doet haar best de informatie op deze kaart
        actueel, correct en toegankelijk te houden, maar kan dit niet
        garanderen. De kaart wordt elke twee weken geactualiseerd. Indien u
        toevoegingen of veranderingen heeft kunt u deze doorgeven aan de
        inhoudelijk contactpersoon die genoemd wordt onder de knop Contact.
        <br />
        <br />
        De Gemeente Amsterdam behoudt zich het auteursrecht voor op de
        informatie op de kaart, inclusief beeldmerken, beeldmateriaal en
        documenten die via de kaart zijn te downloaden. <br />
        <br />
        Citeren of het publiceren van een screenshot van kaart mag uitsluitend
        na goedkeuring van de inhoudelijk contactpersoon.
      </p>
    </div>
  );
};

export default Footer;
