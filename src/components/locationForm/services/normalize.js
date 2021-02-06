import { initalValues } from '../definitions/FormFields';

export const cleanUndefined = item => {
  // Skip the undefined values when creating the formData object
  const result = Object.keys(item).reduce((acc, key) => {
    return item[key]
      ? {
          ...acc,
          [key]: item[key],
        }
      : { ...acc };
  }, {});
  return result;
};

/**
 *
 * @param {object} feature
 *
 * Converts the server geojson feature to a client location object
 *
 */
export const featureToLocation = feature => {
  if (!feature || Object.keys(feature).length === 0) return initalValues;
  console.log('featureToLocation go on', feature, feature?.keys?.length);

  const {
    id,
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
      stadsdeel,
    },
  } = feature;
  return {
    ...initalValues,
    id,
    naam: description,
    nummer: locatie_id,
    coordinaten: `${coordinates[1]}, ${coordinates[0]}`,
    stadsdeel,
    spot_type,
    jaar_blackspotlijst: jaar_blackspotlijst || '',
    jaar_ongeval_quickscan: jaar_ongeval_quickscan || '',
    status,
    actiehouder: actiehouders,
    taken: tasks,
    start_uitvoering,
    eind_uitvoering,
    jaar_oplevering,
    opmerking: notes,
    rapport_document: documents.filter(d => d.type === 'Rapportage')[0],
    design_document: documents.filter(d => d.type === 'Ontwerp')[0],
  };
};

/**
 *
 * @param {object} location
 * Converts a location to the geojson feature
 */
export const locationToFeature = location => {
  const {
    id,
    description,
    locatie_id,
    point,
    stadsdeel,
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
    wegvak,
  } = location;
  return {
    type: 'Feature',
    id,
    properties: {
      description,
      locatie_id,
      stadsdeel,
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
      wegvak,
    },
    geometry: point,
  };
};

/**
 *
 * @param {object} location
 * Converts the location object to FormData for sendig to the server
 */
export const locationToFormData = location => {
  const {
    id,
    naam,
    nummer,
    coordinaten,
    stadsdeel,
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
    id,
    description: naam,
    locatie_id: nummer,
    point: {
      type: 'Point',
      coordinates: coordinaten
        .split(', ')
        .map(s => parseFloat(s))
        .reverse(),
    },
    stadsdeel,
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

  return cleanUndefined(item);
};
