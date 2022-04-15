import { useState, useEffect } from 'react';

const useHttpRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchRequest = async (url) => {
    setIsLoading(true);
    try {
      const jsonResponse = await fetch(url);
      if (!jsonResponse.ok) {
        throw new Error("Something Went Wrong!");
      }
      const response = await jsonResponse.json();
      setIsLoading(false);
      setIsError(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }

    // setCursorMark(response.nextCursorMark);
    // if (isAppend) {
    //   setProducts((prevProducts) => [
    //     ...prevProducts,
    //     ...response.products,
    //   ]);
    //   setIsAppend(false);
    //   setIsLoading(false);
    //   setIsError(false);
    // } else {
    //   setProducts([...response.products]);
    //   setIsLoading(false);
    //   setIsError(false);
    // }
  }
  // setIsLoading(true);
  // fetch(url)
  //   .then((jsonResponse) => jsonResponse.json())
  //   .then((response) => {
  //     // setCursorMark(response.nextCursorMark);
  //     // if (isAppend) {
  //     //   setProducts((prevProducts) => [
  //     //     ...prevProducts,
  //     //     ...response.products,
  //     //   ]);
  //     //   setIsAppend(false);
  //     //   setIsLoading(false);
  //     //   setIsError(false);
  //     // } else {
  //     //   setProducts([...response.products]);
  //     //   setIsLoading(false);
  //     //   setIsError(false);
  //     // }
  //     return response;
  //   })
  //   .catch((error) => {
  //     console.log("Error Occured::::" + error);
  //     setIsLoading(false);
  //     setIsError(true);
  //   });
  return {
    isLoading,
    isError,
    fetchRequest
  }
}
export default useHttpRequest;