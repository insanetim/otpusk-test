import { fetchData } from "../lib/fetch"
import { getCountries, searchGeo } from "../server/api"
import type { CountriesMap, GeoResponse } from "../types"

export const fetchCountriesQuery = fetchData<CountriesMap>(getCountries)

export const searchGeoQuery = fetchData<GeoResponse, [string?]>(searchGeo)
