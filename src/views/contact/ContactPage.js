import React from 'react';
import { NavLink } from 'react-router-dom';

import BlueLinkButton from 'shared/buttons/BlueLinkButton';
import ContentBox from 'shared/contentBox/ContentBox';
import Typography from 'shared/typography/Typography';
import { ContactStyled } from './ContactPage.styled';
import { appRoutes } from 'constants.js';
import DataTable from '../../shared/dataTable/DataTable';

export default () => {
  return (
    <ContentBox>
      <ContactStyled>
        <BlueLinkButton
          to={appRoutes.HOME}
          text="Terug naar kaart"
          chevronDirection="left"
        />
        <h1>Contact</h1>

        <Typography size="L">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>

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
                <a href="mailto:e.van.den.bout@amsterdam.nl">
                  <b>> Elsbeth van den Bout (e.van.den.bout@amsterdam.nl)</b>
                </a>
              </td>
            </tr>
            <tr>
              <td>Technisch contactpersoon</td>
              <td>
                <a href="mailto:j.jansen@amsterdam.nl">
                  <b>> Jan Jansen (j.jansen@amsterdam.nl)</b>
                </a>
              </td>
            </tr>
          </tbody>
        </DataTable>

        <h3>Werkgroep Blackspots Amsterdam</h3>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
      </ContactStyled>
    </ContentBox>
  );
};
