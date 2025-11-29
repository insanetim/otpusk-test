import { useCallback } from "react"
import { getHotelsQuery } from "../api/apiClient"
import {
  selectCachedHotels,
  setCachedHotels,
} from "../store/features/searchToursSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"

const useCachedHotels = () => {
  const dispatch = useAppDispatch()
  const cachedHotels = useAppSelector(selectCachedHotels)

  const fetchHotels = useCallback(
    async (countryId: string) => {
      if (cachedHotels[countryId]) {
        return cachedHotels[countryId]
      }

      const hotels = await getHotelsQuery(countryId)
      dispatch(setCachedHotels({ key: countryId, hotels }))
      return hotels
    },
    [cachedHotels, dispatch]
  )

  return { fetchHotels }
}

export default useCachedHotels
