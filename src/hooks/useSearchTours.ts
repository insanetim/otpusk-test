import { useCallback, useEffect, useRef, useState } from "react"
import {
  selectIsFirstLoad,
  selectSearchTours,
  setHotels,
  setIsFirstLoad,
  setPrices,
} from "../store/features/searchToursSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import type { ErrorResponse } from "../types"
import useCachedHotels from "./useCachedHotels"
import useSearchPrices from "./useSearchPrices"

const useSearchTours = () => {
  const dispatch = useAppDispatch()
  const searchTours = useAppSelector(selectSearchTours)
  const isFirstLoad = useAppSelector(selectIsFirstLoad)
  const { fetchSearchPrices, cancelSearchPrices } = useSearchPrices()
  const { fetchHotels } = useCachedHotels()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ErrorResponse | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchSearchTours = useCallback(
    async (countryId: string) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
        await cancelSearchPrices()
      }

      const abortController = new AbortController()
      abortControllerRef.current = abortController
      const signal = abortController.signal

      if (isFirstLoad) dispatch(setIsFirstLoad(false))
      setLoading(true)

      try {
        const [prices, hotels] = await Promise.all([
          fetchSearchPrices(countryId, signal),
          fetchHotels(countryId),
        ])

        if (signal.aborted) {
          return
        }

        dispatch(setPrices(prices))
        dispatch(setHotels(hotels))
        setError(null)
      } catch (error) {
        if (!signal.aborted) {
          setError(error as ErrorResponse)
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false)
          abortControllerRef.current = null
        }
      }
    },
    [cancelSearchPrices, dispatch, fetchHotels, fetchSearchPrices, isFirstLoad]
  )

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
        cancelSearchPrices()
      }
    }
  }, [cancelSearchPrices])

  return { searchTours, isFirstLoad, loading, error, fetchSearchTours }
}

export default useSearchTours
