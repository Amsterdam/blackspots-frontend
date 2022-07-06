import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  bool,
  func,
  shape,
  number,
  string,
  arrayOf,
  oneOfType,
} from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';
import {
  Heading,
  Button,
  Icon,
  themeColor,
  themeSpacing,
} from '@amsterdam/asc-ui';
import { ExternalLink, Close } from '@amsterdam/asc-assets';
import {
  SpotTypes,
  StatusDisplayNames,
  SpotStatusTypes,
  GeometryTypes,
  SpotTypeDisplayNames,
} from 'config';
import DataTable from '../../shared/dataTable/DataTable';
import SVGIcon from '../SVGIcon/SVGIcon';
import UserContext from '../../shared/user/UserContext';
import { HeaderSecondary } from '../../styles/SharedStyles';
import styles from './DetailPanel.module.scss';
import {
  HeaderStyle,
  ContentStyle,
  TitleStyle,
  ExternalLinkContainerStyle,
  ExternalLinkStyle,
} from './DetailPanelStyle';
import DocumentLink from './components/DocumentLink';

const StyledLink = styled(Link)`
  color: ${themeColor('tint', 'level7')};
  text-decoration: none;
  padding: ${themeSpacing(0, 4)};

  &:hover {
    color: ${themeColor('secondary')};
  }
`;

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

function getDisplayCoordinates(geometry) {
  if (geometry.type === GeometryTypes.POLYGON) {
    return geometry.coordinates[0]
      .map((set) => set.reverse().join(', '))
      .join(', ');
  }

  if (geometry.type === GeometryTypes.POINT) {
    return geometry.coordinates.reverse().join(', ');
  }
}

function getLatLng(geometry) {
  if (geometry.type === GeometryTypes.POLYGON) {
    return geometry.coordinates[0][0];
  }

  if (geometry.type === GeometryTypes.POINT) {
    return geometry.coordinates[0];
  }

  return [];
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
  const [lng, lat] = getLatLng(feature.geometry);
  const reportDocument = documents.find((d) => d.type === 'Rapportage');
  const designDocument = documents.find((d) => d.type === 'Ontwerp');

  return (
    <div
      className={classNames(
        styles.Container,
        isOpen ? styles.ContainerOpen : ''
      )}
    >
      <HeaderStyle>
        <HeaderSecondary forwardedAs="h3">{locatie_id}</HeaderSecondary>
        {canEdit && (
          <StyledLink to={`/edit/${feature.id}`} data-testid="editButton">
            Wijzig
          </StyledLink>
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
              <td>{getDisplayCoordinates(feature.geometry)}</td>
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
        <HeaderSecondary forwardedAs="h4">Maatregelen</HeaderSecondary>
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
          <HeaderSecondary forwardedAs="h4">&gt; Documenten</HeaderSecondary>
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
  isOpen: bool.isRequired,
  togglePanel: func.isRequired,
  feature: shape({
    id: number,
    geometry: shape({
      type: string,
      coordinates: oneOfType([
        arrayOf(number),
        arrayOf(arrayOf(arrayOf(number))),
      ]),
    }),
    properties: shape({
      locatie_id: string,
      description: string,
      spot_type: string,
      status: string,
      stadsdeel: string,
      start_uitvoering: string,
      eind_uitvoering: string,
      tasks: string,
      notes: string,
      jaar_blackspotlijst: number,
      jaar_ongeval_quickscan: number,
      jaar_oplevering: number,
      actiehouders: string,
      documents: arrayOf(
        shape({
          id: number,
          type: string,
          filename: string,
        })
      ),
    }),
  }),
};

DetailPanel.defaultProps = {
  feature: null,
};

export default DetailPanel;
