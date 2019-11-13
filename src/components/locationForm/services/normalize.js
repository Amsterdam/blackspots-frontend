import { initalValues } from '../definitions/FormFields';
import getDate from './getDate';

/**
 *
 * @param {object} item
 *
 * Converts the server feature to a client location object
 *
 */
const normalize = item => {
  if (!item) return initalValues;

  const {
    geometry: { coordinates },
    properties: {
      description,
      locatie_id,
      spot_type,
      jaar_blackspotlijst,
      status,
      actiehouders,
      tasks,
      start_uitvoering,
      eind_uitvoering,
      jaar_oplevering,
      notes,
      documents,
    },
  } = item;
  return {
    ...initalValues,
    naam: description,
    nummer: locatie_id,
    coordinaten: `${coordinates[1]}, ${coordinates[0]}`,
    spot_type,
    jaar_blackspotlijst,
    status: status,
    actiehouder: actiehouders,
    taken: tasks,
    start_uitvoering: getDate(start_uitvoering),
    eind_uitvoering: getDate(eind_uitvoering),
    jaar_oplevering: jaar_oplevering,
    opmerking: notes,
    rapport_document: documents[0],
    design_document: documents[1],
  };
};

export default normalize;
