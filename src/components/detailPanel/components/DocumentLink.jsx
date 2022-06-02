import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import styled from 'styled-components';
import { Icon, themeColor } from '@amsterdam/asc-ui';
import { Download } from '@amsterdam/asc-assets';
import useDataFetching from 'shared/hooks/useDataFetching';
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
  const { results, fetchData } = useDataFetching('blob');
  // eslint-disable-next-line no-underscore-dangle
  const url = `${documentData._links.self.href.split('?')[0]}file/`;
  const { filename } = documentData;
  const [isDownloading, setIsDownloading] = useState(false);
  useEffect(() => {
    if (!results || !isDownloading) return;

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(results, filename);
    } else {
      const href = global.URL.createObjectURL(results);
      const link = document.createElement('a');
      link.href = href;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      global.URL.revokeObjectURL(href);
      document.body.removeChild(link);
    }
    setIsDownloading(false);
  }, [results, filename, isDownloading]);

  const handleDownload = useCallback(() => {
    setIsDownloading(true);
    fetchData(url);
  }, [fetchData, url]);

  return (
    <DocumentContainerStyle>
      <ExternalLinkStyle
        onClick={async (e) => {
          e.stopPropagation();
          e.preventDefault();
          trackDownload();
          handleDownload(e);
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

DocumentLink.propTypes = {
  document: PropTypes.any,
};

export default DocumentLink;
