import React from 'react';
import PropTypes from 'prop-types';

import {
  DetailPanelStyled,
  CloseBtn,
  PanelHeader,
  PanelContent,
} from './DetailPanel.styled';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import DataTable from '../../shared/dataTable/DataTable';

const DetailPanel = ({ isOpen, togglePanel, feature }) => {
  if (!feature) {
    return <DetailPanelStyled isOpen={isOpen} />;
  } else {
    const {
      spot_id,
      description,
      spot_type,
      status,
      stadsdeel,
      jaar_blackspot_lijst,
    } = feature.properties;
    const [lng, lat] = feature.geometry.coordinates;
    return (
      <DetailPanelStyled isOpen={isOpen}>
        <PanelHeader>
          <h1>{spot_id}</h1>
          <CloseBtn onClick={togglePanel}>
            <CrossIcon />
          </CloseBtn>
        </PanelHeader>
        <PanelContent>
          <h2>{description}</h2>
          <DataTable>
            <tbody>
              <tr>
                <td>Locatie type</td>
                <td>{spot_type}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{status}</td>
              </tr>
              <tr>
                <td>Stadsdeel</td>
                <td>{stadsdeel}</td>
              </tr>
              <tr>
                <td>Breedte- en lengtegraad</td>
                <td>
                  {lng} {lat}
                </td>
              </tr>
              <tr>
                <td>Op blackspotlijst</td>
                <td>{jaar_blackspot_lijst}</td>
              </tr>
            </tbody>
          </DataTable>
          <h1>Maatregelen</h1>
          <DataTable>
            <tbody>
              <tr>
                <td>Actiehouder</td>
                <td>WBA</td>
              </tr>
              <tr>
                <td>Taken</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Start uitvoering</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Eind uitvoering</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Oplevering</td>
                <td>Onbekend</td>
              </tr>
              <tr>
                <td>Opmerking</td>
                <td>Planning onbekend</td>
              </tr>
            </tbody>
          </DataTable>
        </PanelContent>
      </DetailPanelStyled>
    );
  }
};

DetailPanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  togglePanel: PropTypes.func.isRequired,
  feature: PropTypes.object,
};

DetailPanel.defaultProps = {
  feature: null,
};

export default DetailPanel;
