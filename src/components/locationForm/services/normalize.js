import { initalValues } from '../definitions/FormFields';

/**
 *
 * @param {object} feature
 *
 * Converts the server feature to a client location object
 *
 */
const fromFeature = feature => {
  if (!feature) return initalValues;

  const {
    geometry: { coordinates },
    properties: {
      description,
      locatie_id,
      spot_type,
      jaar_blackspotlijst,
      jaar_ongeval_quickscan,
      status,
      actiehouders,
      tasks,
      start_uitvoering,
      eind_uitvoering,
      jaar_oplevering,
      notes,
      documents,
    },
  } = feature;
  return {
    ...initalValues,
    naam: description,
    nummer: locatie_id,
    coordinaten: `${coordinates[1]}, ${coordinates[0]}`,
    spot_type,
    jaar_blackspotlijst,
    jaar_ongeval_quickscan,
    status,
    actiehouder: actiehouders,
    taken: tasks,
    start_uitvoering,
    eind_uitvoering,
    jaar_oplevering,
    opmerking: notes,
    rapport_document: documents[0],
    design_document: documents[1],
  };
};

export const toFeature = location => {
  const {
    id,
    description,
    locatie_id,
    point,
    spot_type,
    jaar_blackspotlijst,
    jaar_ongeval_quickscan,
    status,
    actiehouders,
    tasks,
    start_uitvoering,
    eind_uitvoering,
    jaar_oplevering,
    notes,
    rapport_document,
    design_document,
  } = location;
  return {
    type: 'Feature',
    id,
    properties: {
      description,
      locatie_id,
      spot_type,
      jaar_blackspotlijst,
      jaar_ongeval_quickscan,
      status,
      actiehouders,
      tasks,
      start_uitvoering,
      eind_uitvoering,
      jaar_oplevering,
      notes,
      documents: [
        ...(rapport_document ? [rapport_document] : []),
        ...(design_document ? [design_document] : []),
      ],
    },
    geometry: point,
  };
};

/**
 *
 * @param {object} location
 * Converts the location object to the api expected fromat
 */
export const toFormData = location => {
  const {
    naam,
    nummer,
    coordinaten,
    spot_type,
    jaar_blackspotlijst,
    jaar_ongeval_quickscan,
    status,
    actiehouder,
    taken,
    start_uitvoering,
    eind_uitvoering,
    jaar_oplevering,
    opmerking,
    rapport_document,
    design_document,
  } = location;
  const item = {
    description: naam,
    locatie_id: nummer,
    point: JSON.stringify({
      type: 'Point',
      coordinates: coordinaten
        .split(', ')
        .map(s => parseFloat(s))
        .reverse(),
    }),
    spot_type,
    jaar_blackspotlijst,
    jaar_ongeval_quickscan,
    status,
    actiehouders: actiehouder,
    tasks: taken,
    start_uitvoering,
    eind_uitvoering,
    jaar_oplevering,
    notes: opmerking,
    rapport_document:
      rapport_document && rapport_document.file ? rapport_document : undefined,
    design_document:
      design_document && design_document.file ? design_document : undefined,
  };

  // Skip the undefined values when creating the formData object
  const ret = Object.keys(item).reduce((acc, key) => {
    return item[key]
      ? {
          ...acc,
          [key]: item[key],
        }
      : { ...acc };
  }, {});
  return ret;
};

export default fromFeature;
