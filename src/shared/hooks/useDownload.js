import fileSaver from 'file-saver';
import auth from 'shared/auth/auth';

function useDownload() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();

  async function downloadFile(url, name) {
    setLoading(true);
    setError();

    const fileName = name || url.split('/').pop();

    const token = await auth.token();
    const options = {
      method: 'GET',
      headers: { Authorization: token },
    };

    fetch(url, options)
      .then((response) => response.blob())
      .then((blob) => {
        fileSaver(blob, fileName);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }

  return { downloadFile, loading, error };
}

export default useDownload;
