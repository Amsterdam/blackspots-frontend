import { GeometryTypes } from 'config';
import {
  getSpotTypeFromMarker,
  getStatusTypeFromMarker,
  getBlackspotYearFromMarker,
  getDeliveredYearFromMarker,
  getQuickscanYearFromMarker,
} from 'helpers';

/**
 * Check if all values of an object are falsy
 */
export const allValuesAreFalse = (object) => {
  const values = Object.values(object);
  if (values.length === 0) {
    return true;
  }
  return values.every((v) => !v);
};

/**
 * Check if a marker should be visible based on the type filter
 * */
function isVisibleSpotType(spotTypeFilter, stadsdeelFilter, marker) {
  const spotType = getSpotTypeFromMarker(marker);
  // const spotStatus = getStatusTypeFromMarker(marker);
  const { stadsdeel } = marker.properties;

  // Check if the spot should be visible based on the spotTypeFilter
  const showBasedOnTypeFilter = allValuesAreFalse(spotTypeFilter)
    ? true
    : spotTypeFilter[spotType];

  const showBasedOnStadsdeelFilter = allValuesAreFalse(stadsdeelFilter)
    ? true
    : stadsdeelFilter[stadsdeel];

  return showBasedOnTypeFilter && showBasedOnStadsdeelFilter;
}

/**
 * Check if a marker should be visible based on the status filter
 */
function isVisibleStatusType(spotStatusTypeFilter, marker) {
  const statusType = getStatusTypeFromMarker(marker);
  return allValuesAreFalse(spotStatusTypeFilter)
    ? true
    : spotStatusTypeFilter[statusType];
}

/**
 * Check if a marker should be visible based on the blackspot year filter
 */
function isVisibleBlackspotYear(blackspotYearFilter, marker) {
  const year = getBlackspotYearFromMarker(marker);
  if (!year) return false;
  return allValuesAreFalse(blackspotYearFilter)
    ? true
    : blackspotYearFilter[year];
}

/**
 * Check if a marker should be visible based on the delivery year filter
 */
function isVisibleDeliveredYear(deliveredYearFilter, marker) {
  const year = getDeliveredYearFromMarker(marker);
  if (!year) return false;
  return allValuesAreFalse(deliveredYearFilter)
    ? true
    : deliveredYearFilter[year];
}

/**
 * Check if a marker should be visible based on the quickscan year filter
 */
function isVisibleQuickscanYear(quickscanYearFilter, marker) {
  const year = getQuickscanYearFromMarker(marker);
  if (!year) return false;
  return allValuesAreFalse(quickscanYearFilter)
    ? true
    : quickscanYearFilter[year];
}

const evaluateSingleMarkerVisibility = (marker, filter) => {
  if (
    isVisibleSpotType(
      filter?.spotTypeFilter || {},
      filter?.stadsdeelFilter || {},
      marker
    ) &&
    isVisibleStatusType(filter?.spotStatusTypeFilter || {}, marker) &&
    (filter?.show === 'ALL' ||
      (filter?.show === 'BLACKSPOTS' &&
        isVisibleBlackspotYear(filter?.blackspotYearFilter || {}, marker)) ||
      (filter?.show === 'DELIVERED' &&
        isVisibleDeliveredYear(filter?.deliveredYearFilter || {}, marker)) ||
      (filter?.show === 'QUICKSCANS' &&
        isVisibleQuickscanYear(filter?.quickscanYearFilter || {}, marker)))
  ) {
    return true;
  }
  return false;
};

export const getGeoJson = (locations, filter) => {
  const markers = locations
    .filter((location) => {
      if (evaluateSingleMarkerVisibility(location, filter)) {
        return location;
      }
      return null;
    })
    .filter(Boolean);

  // For each Polygon also add a point to the Map.
  const modifiedMarkers = markers
    .map((feature) => {
      if (feature.geometry.type === GeometryTypes.POLYGON) {
        return [polygonToPoint(feature), feature];
      }

      return feature;
    })
    .flat();

  return {
    type: 'FeatureCollection',
    name: 'Black spots',
    crs: {
      type: 'name',
      properties: {
        name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
      },
    },
    features: modifiedMarkers,
  };
};

function polygonToPoint(feature) {
  if (feature?.geometry?.type !== GeometryTypes.POLYGON) {
    return null;
  }

  return {
    ...feature,
    geometry: {
      type: 'Point',
      coordinates: feature.geometry.coordinates[0][0],
    },
  };
}

export function getLatLng(feature) {
  if (!feature || !feature?.geometry) {
    return null;
  }

  return {
    lat:
      feature.geometry?.type === GeometryTypes.POINT
        ? feature.geometry?.coordinates[1]
        : feature.geometry?.coordinates[0][0][1],
    lng:
      feature.geometry?.type === GeometryTypes.POINT
        ? feature.geometry?.coordinates[0]
        : feature.geometry?.coordinates[0][0][0],
  };
}
