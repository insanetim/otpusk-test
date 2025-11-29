import { useCallback, useState } from "react"
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
  const { fetchSearchPrices } = useSearchPrices()
  const { fetchHotels } = useCachedHotels()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ErrorResponse | null>(null)

  const fetchSearchTours = useCallback(
    async (countryId: string) => {
      if (isFirstLoad) dispatch(setIsFirstLoad(false))
      setLoading(true)
      try {
        const [prices, hotels] = await Promise.all([
          fetchSearchPrices(countryId),
          fetchHotels(countryId),
        ])
        dispatch(setPrices(prices))
        dispatch(setHotels(hotels))
        setError(null)
      } catch (error) {
        setError(error as ErrorResponse)
      } finally {
        setLoading(false)
      }
    },
    [dispatch, fetchHotels, fetchSearchPrices, isFirstLoad]
  )

  return { searchTours, isFirstLoad, loading, error, fetchSearchTours }
}

export default useSearchTours
