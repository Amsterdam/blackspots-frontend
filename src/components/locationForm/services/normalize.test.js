import fromFeature from './normalize';
import { initalValues } from '../definitions/FormFields';
import { mockFeature, mockLocation } from '../LocationForm.mock';

describe('normalize', () => {
  it('should return the default form values when no feature is provided', () => {
    expect(fromFeature()).toEqual(initalValues);
  });

  it('should convert the feature to the location', () => {
    expect(fromFeature(mockFeature)).toEqual(mockLocation);
  });
});
