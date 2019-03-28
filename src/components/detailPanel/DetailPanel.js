import React from 'react';
import PropTypes from 'prop-types';
import { DetailPanelStyled } from './DetailPanel.styled';

const DetailPanel = ({ open, togglePanel, feature }) => {
  return (
    <DetailPanelStyled open={open}>
      <button onClick={togglePanel}>Close</button>
      {feature ? feature.properties.description : ''}
    </DetailPanelStyled>
  );
};

DetailPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  togglePanel: PropTypes.func.isRequired,
  feature: PropTypes.object,
};

DetailPanel.defaultProps = {
  feature: null,
};

export default DetailPanel;
