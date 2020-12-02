import React from 'react';
import { getByUrl } from '../api/api';

function useDataFetching() {
  const [results, setResults] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState();
  const [loading, setLoading] = React.useState(false);
  console.log('useDataFetching');

  async function fetchData(endpoint) {
    console.log('data');
    setLoading(true);
    try {
      const data = await getByUrl(endpoint);
      console.log('data after', data);
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
