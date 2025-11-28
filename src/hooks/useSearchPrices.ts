import { useCallback, useState } from "react"
import { getSearchPricesQuery, startSearchPricesQuery } from "../api/apiClient"
import { waitUntilTime } from "../lib/waitUntilTime"
import { selectPrices, setPrices } from "../store/features/searchPricesSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import type { ErrorResponse, StartSearchResponse } from "../types"

const useSearchPrices = () => {
  const dispatch = useAppDispatch()
  const prices = useAppSelector(selectPrices)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ErrorResponse | null>(null)

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

  const fetchSearchResult = useCallback(
    async (countryId: string) => {
      setLoading(true)
      try {
        const searchToken = await startSearchPricesQuery(countryId)
        const { prices } = await pollSearchPrices(searchToken, 2)
        dispatch(setPrices(prices))
        setError(null)
      } catch (error) {
        setError(error as ErrorResponse)
      } finally {
        setLoading(false)
      }
    },
    [dispatch, pollSearchPrices]
  )

  return { prices, loading, error, fetchSearchResult }
}

export default useSearchPrices
