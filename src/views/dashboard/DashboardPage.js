import React, { useState } from 'react';

import Map from 'components/map/Map';
import FilterContextProvider from 'shared/reducers/FilterContext';
import ErrorMsg from '../../shared/errorMsg/ErrorMsg';
import DashboardPageStyle from './DashboardPageStyle';

const DashboardPage = () => {
  const [showError, setShowError] = useState(false);

  return (
    <DashboardPageStyle>
      <ErrorMsg isOpen={showError} />
      <FilterContextProvider>
        <Map setShowError={setShowError} />
      </FilterContextProvider>
    </DashboardPageStyle>
  );
};

export default DashboardPage;
