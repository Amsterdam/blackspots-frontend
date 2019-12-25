import { renderHook } from '@testing-library/react-hooks';
import { SpotStatusTypes, SpotTypes } from 'config';
import { createTestMarker } from 'test/utils';
import useYearFilters from './useYearFilters';

describe('useYearFilters', () => {
  it('should create the filters', () => {
    const features = [
      {
        ...createTestMarker(
          SpotTypes.BLACKSPOT,
          SpotStatusTypes.ONDERZOEK,
          2015,
          null,
          null
        ).feature,
      },
      {
        ...createTestMarker(
          SpotTypes.BLACKSPOT,
          SpotStatusTypes.ONDERZOEK,
          2016,
          null,
          null
        ).feature,
      },
      {
        ...createTestMarker(
          SpotTypes.BLACKSPOT,
          SpotStatusTypes.ONDERZOEK,
          null,
          2015,
          null
        ).feature,
      },
      {
        ...createTestMarker(
          SpotTypes.BLACKSPOT,
          SpotStatusTypes.ONDERZOEK,
          null,
          2016,
          null
        ).feature,
      },
      {
        ...createTestMarker(
          SpotTypes.BLACKSPOT,
          SpotStatusTypes.ONDERZOEK,
          null,
          null,
          2015
        ).feature,
      },
      {
        ...createTestMarker(
          SpotTypes.BLACKSPOT,
          SpotStatusTypes.ONDERZOEK,
          null,
          null,
          2016
        ).feature,
      },
      {
        ...createTestMarker(
          SpotTypes.BLACKSPOT,
          SpotStatusTypes.ONDERZOEK,
          2015,
          null,
          null
        ).feature,
      },
      {
        ...createTestMarker(
          SpotTypes.BLACKSPOT,
          SpotStatusTypes.ONDERZOEK,
          2016,
          null,
          null
        ).feature,
      },
    ];

    const { result } = renderHook(() => useYearFilters(features));
    const {
      blackspotYearFilter,
      deliveredYearFilter,
      quickscanYearFilter,
    } = result.current;
    expect(Object.keys(blackspotYearFilter).length).toEqual(2);
    expect(Object.keys(deliveredYearFilter).length).toEqual(2);
    expect(Object.keys(quickscanYearFilter).length).toEqual(2);
  });
});
