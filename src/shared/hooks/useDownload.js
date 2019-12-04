import React from 'react';
import fileSaver from 'file-saver';

function useDownload() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();

  async function downloadFile(url, name) {
    setLoading(true);
    setError();

    const fileName = name || url.split('/').pop();

    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        fileSaver(blob, fileName);
      })
      .catch(e => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }

  return { downloadFile, loading, error };
}

export default useDownload;
