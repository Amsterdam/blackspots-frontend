/* eslint-disable camelcase */
import { useState, useEffect } from 'react';

const useYearFilters = features => {
  const [blackspotYearFilter, setBlackspotYearFilter] = useState({});
  const [deliveredYearFilter, setDeliveredYearFilter] = useState({});
  const [quickscanYearFilter, setQuickscanYearFilter] = useState({});

  useEffect(() => {
    // Get all the relevant year values for the filters
    const blackspotYears = [];
    const deliveredYears = [];
    const quickscanYears = [];
    if (features)
      features.forEach(f => {
        // Get the year values
        const {
          jaar_blackspotlijst,
          jaar_oplevering,
          jaar_ongeval_quickscan,
        } = f.properties;

        // Add the values to the year arrays if they are not in yet
        if (
          jaar_blackspotlijst &&
          blackspotYears.indexOf(jaar_blackspotlijst) < 0
        ) {
          blackspotYears.push(jaar_blackspotlijst);
        }
        if (jaar_oplevering && deliveredYears.indexOf(jaar_oplevering) < 0) {
          deliveredYears.push(jaar_oplevering);
        }
        if (
          jaar_ongeval_quickscan &&
          quickscanYears.indexOf(jaar_ongeval_quickscan) < 0
        ) {
          quickscanYears.push(jaar_ongeval_quickscan);
        }
      });

    // Add the year values to the filter as false (default filter value)
    const blackspotFilter = blackspotYears.reduce((acc, y) => {
      return { ...acc, [y]: false };
    }, {});
    const deliveredFilter = deliveredYears.reduce((acc, y) => {
      return { ...acc, [y]: false };
    }, {});
    const quickscanFilter = quickscanYears.reduce((acc, y) => {
      return { ...acc, [y]: false };
    }, {});

    setBlackspotYearFilter(blackspotFilter);
    setDeliveredYearFilter(deliveredFilter);
    setQuickscanYearFilter(quickscanFilter);
  }, [features]);
  return {
    blackspotYearFilter,
    deliveredYearFilter,
    quickscanYearFilter,
    setBlackspotYearFilter,
    setDeliveredYearFilter,
    setQuickscanYearFilter,
  };
};

export default useYearFilters;
