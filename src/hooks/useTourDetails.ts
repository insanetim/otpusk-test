import { useCallback, useState } from "react"
import { getHotelQuery, getPriceQuery } from "../api/apiClient"
import type { ErrorResponse, TourDetails } from "../types"

const useTourDetails = () => {
  const [tourDetails, setTourDetails] = useState<TourDetails>()
  const [error, setError] = useState<ErrorResponse | null>(null)

  const fetchTourDetails = useCallback(
    async (priceId: string, hotelId: string) => {
      try {
        const [price, hotel] = await Promise.all([
          getPriceQuery(priceId),
          getHotelQuery(Number(hotelId)),
        ])
        setTourDetails({
          id: price.id,
          amount: price.amount,
          currency: price.currency,
          startDate: price.startDate,
          hotelName: hotel.name,
          hotelCountry: hotel.cityName,
          hotelCity: hotel.countryName,
          hotelImg: hotel.img,
          hotelDescription: hotel.description,
          hotelServices: hotel.services,
        })
        setError(null)
      } catch (error) {
        setError(error as ErrorResponse)
      }
    },
    []
  )

  return { tourDetails, error, fetchTourDetails }
}

export default useTourDetails
