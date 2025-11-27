import { useCallback, useRef, useState } from 'react';
import useSearch from './useSearch';

type StartSearchResponse = {
  token: string;
  waitUntil: string;
};

type SearchResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  startSearch: (countryId: string) => Promise<void>;
  resetSearch: () => void;
};

type UseControlledSearchProps<T> = {
  startSearchPrices: (countryId: string) => Promise<Response>;
  getSearchPrices: (token: string) => Promise<Response>;
  stopSearchPrices: (token: string) => Promise<Response>;
  maxRetries?: number;
  pollInterval?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
};

const useControlledSearch = <T,>({
  startSearchPrices,
  getSearchPrices,
  stopSearchPrices,
  ...options
}: UseControlledSearchProps<T>): SearchResult<T> & { cancelSearch: () => Promise<void> } => {
  const activeTokenRef = useRef<string | null>(null);
  const isCancellingRef = useRef(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const lastRequestIdRef = useRef(0);

  const handleSearchSuccess = useCallback((data: T) => {
    if (isCancellingRef.current) return;
    options.onSuccess?.(data);
  }, [options]);

  const handleSearchError = useCallback((error: Error) => {
    if (isCancellingRef.current) return;
    options.onError?.(error);
  }, [options]);

  const search = useSearch<T>(
    startSearchPrices,
    getSearchPrices,
    {
      ...options,
      onSuccess: handleSearchSuccess,
      onError: handleSearchError,
    }
  );

  const cancelSearch = useCallback(async () => {
    const currentToken = activeTokenRef.current;
    if (!currentToken) return;

    isCancellingRef.current = true;
    setIsCancelling(true);

    try {
      await stopSearchPrices(currentToken);
    } catch (error) {
      console.error('Failed to cancel search:', error);
    } finally {
      if (activeTokenRef.current === currentToken) {
        activeTokenRef.current = null;
      }
      isCancellingRef.current = false;
      setIsCancelling(false);
    }
  }, [stopSearchPrices]);

  const resetSearch = useCallback(() => {
    activeTokenRef.current = null;
    search.resetSearch();
  }, [search]);

  const startSearchWithCancel = useCallback(async (countryId: string) => {
    const requestId = ++lastRequestIdRef.current;

    // Cancel any active search
    if (activeTokenRef.current) {
      await cancelSearch();
    }

    // If this is not the latest request, ignore it
    if (requestId !== lastRequestIdRef.current) return;

    try {
      // Start new search using the provided startSearchPrices function
      const response = await startSearchPrices(countryId);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json() as StartSearchResponse;

      // If this is not the latest request, ignore the result
      if (requestId !== lastRequestIdRef.current) return;

      activeTokenRef.current = result.token;

      // Start polling with the new token
      await search.startSearch(countryId);

      return result;
    } catch (error) {
      if (requestId === lastRequestIdRef.current) {
        throw error;
      }
    }
  }, [cancelSearch, search, startSearchPrices]);

  return {
    ...search,
    startSearch: startSearchWithCancel,
    cancelSearch,
    resetSearch,
    loading: search.loading || isCancelling,
  };
};

export default useControlledSearch;
