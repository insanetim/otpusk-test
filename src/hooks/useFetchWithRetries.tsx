import { useCallback } from 'react';
import type { ApiFunction } from './useFetch';
import useFetch from './useFetch';

type RetryOptions = {
  retries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
};

const useFetchWithRetries = <T, Args extends unknown[] = unknown[]>(
  fn: ApiFunction<Args>,
  options: RetryOptions = {}
) => {
  const {
    retries = 3,
    initialDelay = 1000,
    maxDelay = 30000,
    backoffFactor = 2,
  } = options;

  const fetchWithRetry = useCallback(
    async (...args: Args) => {
      let lastError: Error | null = null;
      let currentDelay = initialDelay;

      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const response = await fn(...args);
          if (response.ok) {
            return response;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        } catch (error) {
          lastError = error as Error;
          if (attempt === retries) break;

          // Calculate next delay with exponential backoff
          const delay = Math.min(currentDelay, maxDelay);
          await new Promise((resolve) => setTimeout(resolve, delay));
          currentDelay *= backoffFactor;
        }
      }

      throw lastError;
    },
    [fn, retries, initialDelay, maxDelay, backoffFactor]
  );

  return useFetch<T, Args>(fetchWithRetry);
};

export default useFetchWithRetries;
