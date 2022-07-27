import { Stadsdeel } from 'config';
import { GeometryTypes } from 'config';
import { initalValues } from '../definitions/FormFields';

export const cleanUndefined = (item) => {
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
export const featureToLocation = (feature) => {
  if (!feature || Object.keys(feature).length === 0) return initalValues;

  const {
    id,
    geometry,
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
    id,
    naam: description,
    locatie_id,
    coordinaten:
      geometry.type === GeometryTypes.POINT
        ? `${geometry.coordinates[1]}, ${geometry.coordinates[0]}`
        : undefined,
    polygon:
      geometry.type === GeometryTypes.POLYGON
        ? `(${[...geometry.coordinates[0]]
            .map((s) => s.reverse())
            .join('), (')})`
        : undefined,
    stadsdeel: parseStadsdeel(stadsdeel),
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
    rapport_document: documents.filter((d) => d.type === 'Rapportage')[0],
    design_document: documents.filter((d) => d.type === 'Ontwerp')[0],
    coord_or_poly: geometry.type,
  };
};

/**
 *
 * @param {object} location
 * Converts a location to the geojson feature
 */
export const locationToFeature = (location) => {
  const {
    id,
    description,
    locatie_id,
    point,
    polygoon,
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
    geometry: point ?? polygoon,
  };
};

/**
 *
 * @param {object} location
 * Converts the location object to FormData for sendig to the server
 */
export const locationToFormData = (location) => {
  const {
    id,
    naam,
    locatie_id,
    coordinaten,
    stadsdeel,
    spot_type,
    jaar_blackspotlijst,
    jaar_ongeval_quickscan,
    jaar_opgenomen_in_ivm_lijst,
    status,
    actiehouder,
    taken,
    start_uitvoering,
    eind_uitvoering,
    jaar_oplevering,
    opmerking,
    rapport_document,
    design_document,
    polygoon,
  } = location;

  const item = {
    id,
    description: naam,
    locatie_id,
    point: coordinaten
      ? {
          type: 'Point',
          coordinates: coordinaten
            .split(', ')
            .map((s) => parseFloat(s))
            .reverse(),
        }
      : null,
    polygoon: polygoon
      ? {
          type: 'Polygon',
          coordinates: parsePolygon(polygoon),
        }
      : null,
    stadsdeel: parseStadsdeel(stadsdeel),
    spot_type,
    jaar_blackspotlijst,
    jaar_ongeval_quickscan,
    jaar_opgenomen_in_ivm_lijst,
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

function parseStadsdeel(stadsdeel) {
  if (!stadsdeel) {
    return stadsdeel;
  }

  // Convert to object of format: { 'Oost': 'M' }
  const stadsdelenFormatted = Object.values(Stadsdeel).reduce((prev, curr) => {
    return {
      ...prev,
      [curr.name]: curr.value,
    };
  }, {});

  // See if the current value is already a stadsdeelcode
  if (Object.values(stadsdelenFormatted).includes(stadsdeel)) {
    return stadsdeel;
  }

  // Else try to find the code and return it.
  return stadsdelenFormatted[stadsdeel];
}

function parsePolygon(polygoon) {
  try {
    const parsedPoly = [
      JSON.parse(
        `[${polygoon.replaceAll('(', '[').replaceAll(')', ']')}]`
      )?.map((set) => set.reverse()),
    ];

    const firstCoords = parsedPoly[0][0];
    const lastCoords = parsedPoly[0][parsedPoly[0].length - 1];

    // If the first and last elements are different coordinates we add the first coordinate to complete the polygon.
    // This is a requirement of the GeoJSON spec. We've implemented this for user convenience.
    if (!firstCoords.every((el) => lastCoords.includes(el))) {
      parsedPoly[0].push(firstCoords);
    }

    return parsedPoly;
  } catch (e) {
    throw new Error('Parsing of polygon failed. ' + e.message);
  }
}
