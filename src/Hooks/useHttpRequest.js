import { useState, useCallback } from 'react';

const useHttpRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchRequest = useCallback(async (url) => {
    setIsLoading(true);
    try {
      const jsonResponse = await fetch(url);
      if (!jsonResponse.ok) {
        throw new Error('Something Went Wrong!');
      }
      const response = await jsonResponse.json();
      setIsLoading(false);
      setIsError(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      return false;
    }
  }, []);
  return {
    isLoading,
    isError,
    fetchRequest,
  };
};
export default useHttpRequest;
