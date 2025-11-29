import { useCallback } from "react"
import { getSearchPricesQuery, startSearchPricesQuery } from "../api/apiClient"
import { waitUntilTime } from "../lib/waitUntilTime"
import type { ErrorResponse, StartSearchResponse } from "../types"

const useSearchPrices = () => {
  const pollSearchPrices = useCallback(
    async ({ token, waitUntil }: StartSearchResponse, maxAttempts = 2) => {
      let lastError: unknown
      let currentwaitUntil = waitUntil

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          await waitUntilTime(currentwaitUntil)
          return await getSearchPricesQuery(token)
        } catch (error) {
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

  const fetchSearchPrices = useCallback(
    async (countryId: string) => {
      const searchToken = await startSearchPricesQuery(countryId)
      const { prices } = await pollSearchPrices(searchToken, 2)
      return prices
    },
    [pollSearchPrices]
  )

  return { fetchSearchPrices }
}

export default useSearchPrices
