import { Stadsdeel, SpotStatusTypes, SpotTypes } from 'config';
import { createTestMarker } from 'test/utils';
import {
  allValuesAreFalse,
  resetFilter,
  createFilter,
  isVisibleStatusType,
  isVisibleBlackspotYear,
  isVisibleQuickscanYear,
  isVisibleDeliveredYear,
  evaluateMarkerVisibility,
} from './helpers';

describe('allValuesAreFalse', () => {
  it('should be false when at least one value is true', () => {
    expect(allValuesAreFalse({ a: true, b: false })).toBeFalsy();
  });

  it('should be true when all values are false', () => {
    expect(allValuesAreFalse({ a: false, b: false })).toBeTruthy();
  });
});

describe('createFilter', () => {
  it('should create the spotTypeFilter', () => {
    const filter = createFilter(SpotTypes);
    expect(Object.keys(filter).length).toEqual(5);
    expect(allValuesAreFalse(filter)).toBeTruthy();
  });

  it('should create the SpotStatusTypes', () => {
    const filter = createFilter(SpotStatusTypes);
    expect(Object.keys(filter).length).toEqual(5);
    expect(Object.keys(filter).includes('gereed')).toBeTruthy();
    expect(allValuesAreFalse(filter)).toBeTruthy();
  });

  it('should create the stadsdeelFilter', () => {
    const filter = createFilter(Stadsdeel, 'name');
    expect(Object.keys(filter).length).toEqual(8);
    expect(Object.keys(filter).includes('Nieuw West')).toBeTruthy();
    expect(allValuesAreFalse(filter)).toBeTruthy();
  });
});

describe('resetFilter', () => {
  it('should reset all values of the filter', () => {
    expect(allValuesAreFalse(resetFilter({ a: true, b: true }))).toBeTruthy();
  });
});

describe('Marker filter utilities', () => {
  let spotStatusTypeFilter;
  let spotTypeFilter;
  let stadsdeelFilter;
  let blackspotListFilter;
  let quickscanListFilter;
  let deliveredListFilter;
  let blackspotYearFilter;
  let quickscanYearFilter;
  let deliveredYearFilter;
  let marker;

  beforeEach(() => {
    spotTypeFilter = createFilter(SpotTypes);
    spotStatusTypeFilter = createFilter(SpotStatusTypes);
    stadsdeelFilter = createFilter(Stadsdeel, 'name');
    blackspotListFilter = false;
    quickscanListFilter = false;
    deliveredListFilter = false;
    blackspotYearFilter = {};
    quickscanYearFilter = {};
    deliveredYearFilter = {};
    marker = createTestMarker();
  });

  describe('isVisibleSpotType', () => {});

  describe('isVisibleStatusType', () => {
    it('should show the marker when no status is checked', () => {
      expect(isVisibleStatusType(spotStatusTypeFilter, marker)).toBeTruthy();
    });

    it('should show the marker when the status is checked', () => {
      expect(
        isVisibleStatusType(
          { ...spotStatusTypeFilter, [SpotStatusTypes.ONDERZOEK]: true },
          marker
        )
      ).toBeTruthy();
    });

    it('should show the marker when other status is checked', () => {
      expect(
        isVisibleStatusType(
          { ...spotStatusTypeFilter, [SpotStatusTypes.GEREED]: true },
          marker
        )
      ).toBeFalsy();
    });
  });

  describe('isVisibleBlackspotYear', () => {
    it('should show the marker when no year is checked', () => {
      expect(isVisibleBlackspotYear(blackspotYearFilter, marker)).toBeTruthy();
    });
  });

  describe('isVisibleDeliverYear', () => {
    it('should show the marker when no year is checked', () => {
      expect(isVisibleDeliveredYear(deliveredYearFilter, marker)).toBeTruthy();
    });
  });

  describe('isVisibleQuickscanYear', () => {
    it('should show the marker when no year is checked', () => {
      expect(isVisibleQuickscanYear(quickscanYearFilter, marker)).toBeTruthy();
    });
  });

  describe('evaluateMarkerVisibility', () => {
    it('should show the marker when nothing is checked', () => {
      evaluateMarkerVisibility(
        [marker],
        spotTypeFilter,
        spotStatusTypeFilter,
        blackspotYearFilter,
        deliveredYearFilter,
        quickscanYearFilter,
        blackspotListFilter,
        deliveredListFilter,
        quickscanListFilter,
        stadsdeelFilter
      );
      // eslint-disable-next-line no-underscore-dangle
      expect(marker._icon.style.visibility).toEqual('visible');
    });

    it('should not show the marker when another filter type is checked', () => {
      evaluateMarkerVisibility(
        [marker],
        { ...spotTypeFilter, [SpotTypes.WEGVAK]: true },
        spotStatusTypeFilter,
        blackspotYearFilter,
        deliveredYearFilter,
        quickscanYearFilter,
        blackspotListFilter,
        deliveredListFilter,
        quickscanListFilter,
        stadsdeelFilter
      );
      // eslint-disable-next-line no-underscore-dangle
      expect(marker._icon.style.visibility).toEqual('hidden');
    });
  });
});
