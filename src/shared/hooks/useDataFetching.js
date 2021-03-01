import React from 'react';
import { getByUrl } from '../api/api';

function useDataFetching(type = 'json') {
  const [results, setResults] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState();
  const [loading, setLoading] = React.useState(false);

  async function fetchData(endpoint) {
    setLoading(true);
    try {
      const data = await getByUrl(endpoint, type);
      setResults(data);
    } catch (e) {
      setErrorMessage(e.message);
    }

    setLoading(false);
    return results;
  }

  return {
    errorMessage,
    loading,
    results,
    fetchData,
  };
}

export default useDataFetching;
