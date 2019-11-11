import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import { ReactComponent as DocumentIcon } from 'assets/icons/document.svg';
import DataTable from '../../shared/dataTable/DataTable';
import SVGIcon from '../SVGIcon/SVGIcon';

import { SpotTypes, StatusDisplayNames, SpotStatusTypes } from 'constants.js';
import styles from './DetailPanel.module.scss';
import classNames from 'classnames';
import BlueLinkButton from 'shared/buttons/BlueLinkButton';

import { spotTypeDisplayNames } from '../../constants';

import { trackDownload } from 'helpers';
import UserContext from '../../shared/user/UserContext';

import { Heading, Button, Link } from '@datapunt/asc-ui';

import { Close } from '@datapunt/asc-assets';
import { HeaderStyle, ContentStyle } from './DetailPanelStyle';

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
  } else {
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
      jaar_blackspot_lijst,
      jaar_ongeval_quickscan,
      jaar_oplevering,
      actiehouders,
      documents,
    } = feature.properties;
    const [lng, lat] = feature.geometry.coordinates;

    return (
      <div
        className={classNames(
          styles.Container,
          isOpen ? styles.ContainerOpen : ''
        )}
      >
        <HeaderStyle>
          <Heading $as="h3" color="secondary">
            {locatie_id}
          </Heading>
          {canEdit && (
            <Link
              $as={NavLink}
              to={`/edit/${locatie_id}`}
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
          <h2>{description}</h2>
          <DataTable>
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
                  {spotTypeDisplayNames[spot_type]}
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
                <td>Breedte- en lengtegraad</td>
                <td>
                  {lat}, {lng}
                </td>
              </tr>
              {jaar_blackspot_lijst && (
                <tr>
                  <td>Op blackspotlijst</td>
                  <td>{jaar_blackspot_lijst}</td>
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
          <div className={styles.LinkContainer}>
            <BlueLinkButton
              text="Panoramabeeld"
              external={true}
              to={`http://maps.google.com/maps?q=&layer=c&cbll=${lat},${lng}`}
            />
          </div>
          <h3>Maatregelen</h3>
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
          {documents.length > 0 && <h3>Documenten</h3>}
          {documents.map(d => {
            return (
              <div key={d.id} className={styles.DocumentsContainer}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <DocumentIcon />
                      </td>
                      <td>
                        <a
                          onClick={() => trackDownload()}
                          href={`${d._links.self.href.split('?')[0]}file`}
                          download
                        >
                          {d.filename}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </ContentStyle>
      </div>
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
