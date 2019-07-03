import React from 'react';

import BlueLinkButton from 'shared/buttons/BlueLinkButton';
import { appRoutes } from 'constants.js';
import DataTable from '../../shared/dataTable/DataTable';
import styles from './ContactPage.module.scss';
import { ReactComponent as Chevron } from 'assets/icons/chevron-left.svg';

export default () => {
  return (
    <div className={styles.Container}>
      <BlueLinkButton
        to={appRoutes.HOME}
        text="Terug naar kaart"
        chevronDirection="left"
      />
      <h1>Contact</h1>
      <h3>Details</h3>
      <DataTable>
        <tbody>
          <tr>
            <td>Publicatiedatum</td>
            <td>01-06-2019</td>
          </tr>
          <tr>
            <td>Wijzigingsdatum</td>
            <td>01-06-2019</td>
          </tr>
          <tr>
            <td>Wijzigingsfrequentie</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Gebiedseenheid</td>
            <td>Specifieke punten/lijnen</td>
          </tr>
          <tr>
            <td>Taal</td>
            <td>Nederlands</td>
          </tr>
          <tr>
            <td>Eigenaar</td>
            <td>Gemeente Amsterdam, Werkgroep Blackspots Amsterdam</td>
          </tr>
          <tr>
            <td>Inhoudelijk contactpersoon</td>
            <td>
              <a
                className={styles.EmailLink}
                href="mailto:e.van.den.bout@amsterdam.nl"
              >
                <Chevron />
                Elsbeth van den Bout (e.van.den.bout@amsterdam.nl)
              </a>
            </td>
          </tr>
        </tbody>
      </DataTable>
      <h3>Werkgroep Blackspots Amsterdam</h3>
      <p>
        De Werkgroep Blackspots Amsterdam (WBA) is een expertteam van de
        gemeente Amsterdam. De werkgroep onderzoekt en geeft advies over
        locaties waar ernstige of dodelijke ongevallen zijn gebeurd. Daaronder
        vallen niet alleen de blackspots in de stad. Ook de zogenoemde Red
        Routes en Risico Locaties vallen hieronder. Als het onderzoek en advies
        leiden tot een maatregel worden deze door een speciaal team van het
        Ingenieursbureau uitgevoerd. Kleine en eenvoudige maatregelen worden op
        korte termijn uitgevoerd. Grote en meer complexe maatregelen worden vaak
        op langere termijn en in combinatie met andere werkzaamheden uitgevoerd.
        Bij dodelijke ongevallen wordt een speciaal protocol gevolgd dat onder
        andere voorziet in het nemen van maatregelen op korte termijn. De
        werkgroep heeft hierbij nauw contact met de politie.
      </p>
      Pixel Terror - Ultima
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
