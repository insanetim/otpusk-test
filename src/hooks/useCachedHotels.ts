import { useCallback, useRef } from "react"
import { getHotelsQuery } from "../api/apiClient"
import type { HotelsMap } from "../types"

const useCachedHotels = () => {
  const cachedHotels = useRef<Record<string, HotelsMap>>({})

  const fetchHotels = useCallback(async (countryId: string) => {
    if (cachedHotels.current[countryId]) {
      return cachedHotels.current[countryId]
    }

    const hotels = await getHotelsQuery(countryId)
    cachedHotels.current[countryId] = hotels
    return hotels
  }, [])

  return { fetchHotels }
}

export default useCachedHotels
