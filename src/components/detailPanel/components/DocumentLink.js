import React from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import styled from 'styled-components';
import { Icon, themeColor } from '@amsterdam/asc-ui';
import { Download } from '@amsterdam/asc-assets';
import { getWithToken } from 'shared/api/api';
import auth from 'shared/auth/auth';
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
        onClick={async e => {
          e.preventDefault();
          trackDownload();
          const token = await auth.token();
          // eslint-disable-next-line no-underscore-dangle
          const href = `${documentData._links.self.href.split('?')[0]}file`;
          getWithToken(href, null, null, token);
        }}
        download
        variant="inline"
      >
        <Icon size={14} color={`${themeColor('primary', 'main')}`}>
          &gt;
          <Download />
        </Icon>
        <TextWithOverflow>{documentData.filename}</TextWithOverflow>
      </ExternalLinkStyle>
    </DocumentContainerStyle>
  );
};

export default DocumentLink;
