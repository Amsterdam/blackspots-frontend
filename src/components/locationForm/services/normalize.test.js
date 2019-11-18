import normalize from './normalize';
import { initalValues } from '../definitions/FormFields';
import { mockFeature, mockLocation } from '../LocationForm.mock';

describe('normalize', () => {
  it('should return the default form values when no feature is provided', () => {
    expect(normalize()).toEqual(initalValues);
  });

  it('should convert the feature to the location', () => {
    expect(normalize(mockFeature)).toEqual(mockLocation);
  });
});
