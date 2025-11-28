import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { GetSearchPricesResponse, PricesMap } from "../../types"

interface SearchPricesState {
  prices: PricesMap
}

const initialState: SearchPricesState = {
  prices: {},
}

const searchPricesSlice = createSlice({
  name: "searchPrices",
  initialState,
  reducers: {
    setPrices: (
      state,
      action: PayloadAction<GetSearchPricesResponse["prices"]>
    ) => {
      state.prices = action.payload
    },
  },
  selectors: {
    selectPrices: state => state.prices,
    selectPricesList: state => Object.values(state.prices),
  },
})

export const { setPrices } = searchPricesSlice.actions

export const { selectPrices, selectPricesList } = searchPricesSlice.selectors

export default searchPricesSlice
