import { fetchData } from "../lib/fetch"
import {
  getCountries,
  getHotel,
  getHotels,
  getPrice,
  getSearchPrices,
  searchGeo,
  startSearchPrices,
} from "../server/api"
import type {
  CountriesMap,
  ExHotel,
  GeoResponse,
  GetSearchPricesResponse,
  HotelsMap,
  PriceOffer,
  StartSearchResponse,
} from "../types"

export const fetchCountriesQuery = fetchData<CountriesMap>(getCountries)

export const searchGeoQuery = fetchData<GeoResponse, [string?]>(searchGeo)

export const startSearchPricesQuery = fetchData<StartSearchResponse, [string]>(
  startSearchPrices
)

export const getSearchPricesQuery = fetchData<
  GetSearchPricesResponse,
  [string]
>(getSearchPrices)

export const getHotelsQuery = fetchData<HotelsMap, [string]>(getHotels)

export const getPriceQuery = fetchData<PriceOffer, [string]>(getPrice)

export const getHotelQuery = fetchData<ExHotel, [number]>(getHotel)
