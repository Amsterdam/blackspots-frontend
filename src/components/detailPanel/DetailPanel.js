/* eslint-disable camelcase */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Heading, Button, Link, Icon, themeColor } from '@amsterdam/asc-ui';

// import { NavLink } from 'react-router-dom';

import { ExternalLink, Close } from '@amsterdam/asc-assets';

import { SpotTypes, StatusDisplayNames, SpotStatusTypes } from 'config';
import classNames from 'classnames';

// import BlueLinkButton from 'shared/buttons/BlueLinkButton';
import DataTable from '../../shared/dataTable/DataTable';
import SVGIcon from '../SVGIcon/SVGIcon';

import styles from './DetailPanel.module.scss';

import { SpotTypeDisplayNames } from '../../config';

import UserContext from '../../shared/user/UserContext';
import { AscHeaderSecondary } from '../../styles/SharedStyles';

import {
  HeaderStyle,
  ContentStyle,
  TitleStyle,
  ExternalLinkContainerStyle,
  ExternalLinkStyle,
} from './DetailPanelStyle';
import DocumentLink from './components/DocumentLink';

function getStatusClassName(status) {
  const statusClassMapper = {
    [SpotStatusTypes.ONDERZOEK]: styles.Onderzoek,
    [SpotStatusTypes.VOORBEREIDING]: styles.Voorbereiding,
    [SpotStatusTypes.GEREED]: styles.Gereed,
    [SpotStatusTypes.GEEN_MAATREGEL]: styles.GeenMaatregel,
    [SpotStatusTypes.UITVOERING]: styles.Uitvoering,
    [SpotStatusTypes.ONBEKEND]: styles.Onbekend,
  };

  return statusClassMapper[status];
}

const DetailPanel = ({ isOpen, togglePanel, feature }) => {
  const { canEdit } = useContext(UserContext);
  if (!feature) {
    return <div className={classNames(styles.Container)} />;
  }
  const {
    locatie_id,
    description,
    spot_type,
    status,
    stadsdeel,
    start_uitvoering,
    eind_uitvoering,
    tasks,
    notes,
    jaar_blackspotlijst,
    jaar_ongeval_quickscan,
    jaar_oplevering,
    actiehouders,
    documents,
  } = feature.properties;
  const [lng, lat] = feature.geometry.coordinates;
  const reportDocument = documents.find(d => d.type === 'Rapportage');
  const designDocument = documents.find(d => d.type === 'Ontwerp');
  return (
    <div
      className={classNames(
        styles.Container,
        isOpen ? styles.ContainerOpen : ''
      )}
    >
      <HeaderStyle>
        <AscHeaderSecondary forwardedAs="h3">{locatie_id}</AscHeaderSecondary>
        {canEdit && (
          <Link
            href={`/edit/${feature.id}`}
            variant="inline"
            data-testid="editButton"
          >
            Wijzig
          </Link>
        )}
        <Button
          size={24}
          variant="blank"
          iconSize={20}
          icon={<Close />}
          onClick={togglePanel}
        />
      </HeaderStyle>
      <ContentStyle>
        <TitleStyle>
          <Heading forwardedAs="h2">{description}</Heading>
        </TitleStyle>
        <DataTable bottom={2}>
          <tbody>
            <tr>
              <td>Locatie type</td>
              {/** TODO: Use same component for icons as is used in the filter panel */}
              <td
                className={classNames(
                  styles.IconCell,
                  spot_type === SpotTypes.RISICO
                    ? styles.IconCellExtraMargin
                    : ''
                )}
              >
                <SVGIcon small type={spot_type} />
                {SpotTypeDisplayNames[spot_type]}
              </td>
            </tr>
            <tr>
              <td>Status</td>
              {/** TODO: Use same component for status boxes as is used in the filter panel */}
              <td className={styles.StatusCell}>
                <div
                  className={classNames(
                    styles.StatusBox,
                    getStatusClassName(status)
                  )}
                />
                {StatusDisplayNames[status]}
              </td>
            </tr>
            <tr>
              <td>Stadsdeel</td>
              <td>{stadsdeel}</td>
            </tr>
            <tr>
              <td>Coördinaten</td>
              <td>
                {lat}, {lng}
              </td>
            </tr>
            {jaar_blackspotlijst && (
              <tr>
                <td>Op blackspotlijst</td>
                <td>{jaar_blackspotlijst}</td>
              </tr>
            )}
            {jaar_ongeval_quickscan && (
              <tr>
                <td>Op protocollijst</td>
                <td>{jaar_ongeval_quickscan}</td>
              </tr>
            )}
          </tbody>
        </DataTable>
        <ExternalLinkContainerStyle>
          <ExternalLinkStyle
            href={`http://maps.google.com/maps?q=&layer=c&cbll=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="inline"
          >
            <Icon size={14} color={`${themeColor('primary', 'main')}`}>
              <ExternalLink />
            </Icon>
            Panoramabeeld
          </ExternalLinkStyle>
        </ExternalLinkContainerStyle>
        <AscHeaderSecondary forwardedAs="h4">Maatregelen</AscHeaderSecondary>
        <DataTable>
          <tbody>
            <tr>
              <td>Actiehouder</td>
              <td>{actiehouders || '-'}</td>
            </tr>
            <tr>
              <td>Taken</td>
              <td>{tasks || '-'}</td>
            </tr>
            <tr>
              <td>Start uitvoering</td>
              <td>{start_uitvoering || 'Onbekend'}</td>
            </tr>
            <tr>
              <td>Eind uitvoering</td>
              <td>{eind_uitvoering || 'Onbekend'}</td>
            </tr>
            <tr>
              <td>Oplevering</td>
              <td>{jaar_oplevering || '-'}</td>
            </tr>
            <tr>
              <td>Opmerking</td>
              <td>{notes || '-'}</td>
            </tr>
          </tbody>
        </DataTable>
        {documents.length > 0 && (
          <AscHeaderSecondary forwardedAs="h4">
            &gt; Documenten
          </AscHeaderSecondary>
        )}

        {reportDocument || designDocument ? (
          <DataTable>
            <tbody>
              {reportDocument && (
                <tr>
                  <td>Rapportage</td>
                  <td>
                    <DocumentLink document={reportDocument} />
                  </td>
                </tr>
              )}
              {designDocument && (
                <tr>
                  <td>Ontwerp</td>
                  <td>
                    <DocumentLink document={designDocument} />
                  </td>
                </tr>
              )}
            </tbody>
          </DataTable>
        ) : null}
      </ContentStyle>
    </div>
  );
};

DetailPanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  togglePanel: PropTypes.func.isRequired,
  feature: PropTypes.shape({}),
};

DetailPanel.defaultProps = {
  feature: null,
};

export default DetailPanel;
