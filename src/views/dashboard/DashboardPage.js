import { useState } from 'react';

import Map from 'components/map/Map';
import ErrorMsg from '../../shared/errorMsg/ErrorMsg';
import DashboardPageStyle from './DashboardPageStyle';

const DashboardPage = () => {
  const [showError, setShowError] = useState(false);

  return (
    <DashboardPageStyle data-testid="dashboard">
      <ErrorMsg isOpen={showError} />
      <Map setShowError={setShowError} />
    </DashboardPageStyle>
  );
};

export default DashboardPage;
