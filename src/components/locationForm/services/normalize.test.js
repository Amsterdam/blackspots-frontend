import { initalValues } from '../definitions/FormFields';
import { featureMock, locationMock, formDataMock } from '../LocationForm.mock';
import {
  featureToLocation,
  locationToFormData,
  locationToFeature,
} from './normalize';

describe('normalize', () => {
  it('should return the default form values when no feature is provided', () => {
    expect(featureToLocation()).toEqual(initalValues);
  });

  it('should convert the geojson feature to the location', () => {
    expect(featureToLocation(featureMock)).toEqual(locationMock);
  });

  it('should convert the feature to the location when certain fields are null', () => {
    const testFeature = {
      ...featureMock,
      properties: {
        ...featureMock.properties,
        jaar_blackspotlijst: null,
        jaar_ongeval_quickscan: null,
      },
    };
    const location = featureToLocation(testFeature);
    expect(location.jaar_blackspotlijst).toEqual('');
    expect(location.jaar_ongeval_quickscan).toEqual('');
  });

  it('should convert location to the form data and skip the empty fields', () => {
    const formData = locationToFormData(locationMock);
    expect(formData).toEqual(formDataMock);
  });

  it('should convert the formDataLocation to the gejson feature', () => {
    const feature = locationToFeature(formDataMock);
    expect(feature.id).toEqual(featureMock.id);
    expect(feature.geometry).toEqual(featureMock.geometry);
  });
});
