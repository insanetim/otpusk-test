import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit"
import type { HotelsMap, PricesMap, SearchTour } from "../../types"

interface SearchPricesState {
  prices: PricesMap
  hotels: HotelsMap
  isFirstLoad: boolean
}

const initialState: SearchPricesState = {
  prices: {},
  hotels: {},
  isFirstLoad: true,
}

const searchToursSlice = createSlice({
  name: "searchTours",
  initialState,
  reducers: {
    setPrices: (state, action: PayloadAction<PricesMap>) => {
      state.prices = action.payload
    },
    setHotels: (state, action: PayloadAction<HotelsMap>) => {
      state.hotels = action.payload
    },
    setIsFirstLoad: (state, action: PayloadAction<boolean>) => {
      state.isFirstLoad = action.payload
    },
  },
  selectors: {
    selectPrices: state => state.prices,
    selectHotels: state => state.hotels,
    selectIsFirstLoad: state => state.isFirstLoad,
  },
})

export const { setPrices, setHotels, setIsFirstLoad } = searchToursSlice.actions

export const { selectPrices, selectHotels, selectIsFirstLoad } =
  searchToursSlice.selectors

export const selectSearchTours = createSelector(
  [selectPrices, selectHotels],
  (prices, hotels): SearchTour[] => {
    return Object.values(prices).map(price => {
      const hotel = price.hotelID ? hotels[price.hotelID] : undefined
      return {
        id: price.id,
        amount: price.amount,
        currency: price.currency,
        startDate: price.startDate,
        hotelId: price.hotelID || "",
        hotelName: hotel?.name || "Unknown Hotel",
        hotelCountry: hotel?.countryName || "Unknown Country",
        hotelCity: hotel?.cityName || "Unknown City",
        hotelImg: hotel?.img || "",
      }
    })
  }
)

export default searchToursSlice
