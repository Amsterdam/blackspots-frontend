import React from 'react';
import { getAllBlackspots } from '../../services/geo-api';

function useDataFetching() {
  const [results, setResults] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function fetchData(endpoint) {
    setLoading(true);
    try {
      const data = await getAllBlackspots(endpoint);
      console.log(data);
      setResults(data);
    } catch (e) {
      setErrorMessage(e.message);
    }

    setLoading(false);
    // console.log(results);
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
