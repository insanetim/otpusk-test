import { useCallback, useEffect, useRef } from "react"
import {
  getSearchPricesQuery,
  startSearchPricesQuery,
  stopSearchPricesQuery,
} from "../api/apiClient"
import { waitUntilTime } from "../lib/waitUntilTime"
import type { ErrorResponse, StartSearchResponse } from "../types"

const useSearchPrices = () => {
  const activeTokenRef = useRef<string | null>(null)

  const pollSearchPrices = useCallback(
    async (
      { token, waitUntil }: StartSearchResponse,
      maxAttempts = 2,
      signal?: AbortSignal
    ) => {
      let lastError: unknown
      let currentwaitUntil = waitUntil

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        if (signal?.aborted) {
          throw new Error("Search cancelled")
        }

        try {
          await waitUntilTime(currentwaitUntil, signal)

          if (signal?.aborted) {
            throw new Error("Search cancelled")
          }

          return await getSearchPricesQuery(token)
        } catch (error) {
          if (error instanceof Error && error.message === "Wait cancelled") {
            throw new Error("Search cancelled")
          }

          lastError = error

          if (attempt === maxAttempts) break

          const errorResponce = error as ErrorResponse
          if (errorResponce.code === 425 && errorResponce.waitUntil) {
            currentwaitUntil = errorResponce.waitUntil
          }
        }
      }

      throw lastError
    },
    []
  )

  const cancelSearchPrices = useCallback(async () => {
    const currentToken = activeTokenRef.current
    if (currentToken) {
      activeTokenRef.current = null
      await stopSearchPricesQuery(currentToken)
    }
  }, [])

  const fetchSearchPrices = useCallback(
    async (countryId: string, signal?: AbortSignal) => {
      if (signal?.aborted) {
        await cancelSearchPrices()
        throw new Error("Search cancelled")
      }

      const searchToken = await startSearchPricesQuery(countryId)
      activeTokenRef.current = searchToken.token

      try {
        const { prices } = await pollSearchPrices(searchToken, 2, signal)
        return prices
      } catch (error) {
        await cancelSearchPrices()
        throw error
      } finally {
        if (activeTokenRef.current === searchToken?.token) {
          activeTokenRef.current = null
        }
      }
    },
    [pollSearchPrices, cancelSearchPrices]
  )

  useEffect(() => {
    return () => {
      cancelSearchPrices()
    }
  }, [cancelSearchPrices])

  return { fetchSearchPrices, cancelSearchPrices }
}

export default useSearchPrices
