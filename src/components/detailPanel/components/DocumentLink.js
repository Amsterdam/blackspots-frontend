import React from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import styled from 'styled-components';
import { Icon, themeColor } from '@amsterdam/asc-ui';
import { Download } from '@amsterdam/asc-assets';
import { ExternalLinkStyle } from '../DetailPanelStyle';
import TextWithOverflow from './TextWithOverflow';

export const DocumentContainerStyle = styled.div`
  max-width: 253px; /* fixed column width from design */
`;

const DocumentLink = ({ document: documentData }) => {
  const { trackEvent } = useMatomo();
  const trackDownload = () => {
    trackEvent({ category: 'PDF download', action: 'download' });
  };
  return (
    <DocumentContainerStyle>
      <ExternalLinkStyle
        onClick={trackDownload}
        // eslint-disable-next-line no-underscore-dangle
        href={`${documentData._links.self.href.split('?')[0]}file`}
        download
        variant="inline"
      >
        <Icon size={14} color={`${themeColor('primary', 'main')}`}>
          >
          <Download />
        </Icon>
        <TextWithOverflow>{documentData.filename}</TextWithOverflow>
      </ExternalLinkStyle>
    </DocumentContainerStyle>
  );
};

export default DocumentLink;
