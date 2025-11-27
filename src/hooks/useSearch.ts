import { useCallback, useEffect, useRef, useState } from 'react';
import type { StartSearchResponse } from '../types';
import type { ApiFunction } from './useFetch';
import useFetchWithRetries from './useFetchWithRetries';

type SearchResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  startSearch: (countryId: string) => Promise<void>;
  resetSearch: () => void;
};

// Using the StartSearchResponse type from types.ts

type SearchOptions<T> = {
  maxRetries?: number;
  pollInterval?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
};

const DEFAULT_RETRIES = 2;
const DEFAULT_POLL_INTERVAL = 1000; // 1 second

const useSearch = <T>(
  startSearchPrices: (countryId: string) => Promise<Response>,
  getSearchPrices: (token: string) => Promise<Response>,
  options: SearchOptions<T> = {}
): SearchResult<T> => {
  const {
    maxRetries = DEFAULT_RETRIES,
    pollInterval = DEFAULT_POLL_INTERVAL,
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchToken, setSearchToken] = useState<string | null>(null);
  const pollingRef = useRef<number | null>(null);

  const { fetchData: startSearch } = useFetchWithRetries<StartSearchResponse, [string]>(
    startSearchPrices as unknown as ApiFunction<[string]>,
    { retries: maxRetries }
  );

  const { fetchData: pollSearchResults } = useFetchWithRetries<T, [string]>(
    getSearchPrices as unknown as ApiFunction<[string]>,
    { retries: maxRetries }
  );

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearTimeout(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  const resetSearch = useCallback(() => {
    stopPolling();
    setSearchToken(null);
    setData(null);
    setError(null);
    setLoading(false);
  }, [stopPolling]);

  const pollForResults = useCallback(
    async (token: string) => {
      if (!token) return;

      try {
        const result = await pollSearchResults(token);
        if (result !== undefined) {
          setData(result);
          setLoading(false);
          onSuccess?.(result);
          stopPolling();
        }
      } catch (err) {
        const error = err as Error;
        setError(error);
        setLoading(false);
        onError?.(error);
        stopPolling();
      }
    },
    [pollSearchResults, onSuccess, onError, stopPolling]
  );

  const scheduleNextPoll = useCallback(
    (nextRequestTime: string) => {
      const now = new Date().getTime();
      const nextTime = new Date(nextRequestTime).getTime();
      const delay = Math.max(0, nextTime - now) + pollInterval;

      stopPolling();
      pollingRef.current = window.setTimeout(() => {
        if (searchToken) {
          pollForResults(searchToken);
        }
      }, delay);
    },
    [pollForResults, searchToken, pollInterval, stopPolling]
  );

  const startSearchProcess = useCallback(
    async (countryId: string) => {
      resetSearch();
      setLoading(true);

      try {
        const result = await startSearch(countryId);
        const response = result as unknown as StartSearchResponse;
        setSearchToken(response.token);
        scheduleNextPoll(response.waitUntil);
      } catch (err) {
        const error = err as Error;
        setError(error);
        setLoading(false);
        onError?.(error);
      }
    },
    [startSearch, resetSearch, scheduleNextPoll, onError]
  );

  // Clean up polling on unmount
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  return {
    data,
    loading,
    error,
    startSearch: startSearchProcess,
    resetSearch,
  };
};

export default useSearch;
