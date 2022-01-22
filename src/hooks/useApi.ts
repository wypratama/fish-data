import { useState, useEffect, useCallback } from 'react';
import SteinStore from 'stein-js-client';
import { Methods } from '../App';

/**
 * retrieve data from SteinStore
 */
export default <T>(
  method: Methods,
  sheet: string,
  options?: Options,
  newData?: unknown
) => {
  const [data, setData] = useState<T | null>(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(false),
    args = newData ? [sheet, newData, options] : [sheet, options],
    fetchData = useCallback(async () => {
      try {
        const store = new SteinStore(import.meta.env.VITE_API_URL),
          response = await store[method as keyof SteinStore].apply(
            store,
            args as any
          );
        setData(response);
      } catch (error) {
        console.log(error);
        setError(true);
      }
      setLoading(false);
    }, [method, sheet, options, newData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
  };
};
