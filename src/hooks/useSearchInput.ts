import { debounce } from "lodash"
import { useCallback, useEffect, useState } from "react"
import { fetchCountriesQuery, searchGeoQuery } from "../api/apiClient"
import type { DropdownItemType } from "../components/DropdownItem"
import {
  selectSearchQuery,
  setSearchQuery,
} from "../store/features/searchFormSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import type { CountriesMap, Country, GeoEntity, GeoResponse } from "../types"

const useSearchInput = () => {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector(selectSearchQuery)

  const [debouncedSearch] = useState(() =>
    debounce((value: string) => {
      dispatch(setSearchQuery({ value, isCountry: false }))
    }, 300)
  )
  const [searchData, setSearchData] = useState<Country[] | GeoEntity[]>([])

  const onInputChange = useCallback(
    (value: string) => {
      debouncedSearch(value)
    },
    [debouncedSearch]
  )

  const onItemClick = useCallback(
    (item: DropdownItemType) => {
      const newValue = {
        value: item.name,
        isCountry:
          ("type" in item && item.type === "country") || "flag" in item,
      }
      dispatch(setSearchQuery(newValue))
    },
    [dispatch]
  )

  useEffect(() => {
    const fetchData = async (searchQuery: {
      value: string
      isCountry: boolean
    }) => {
      try {
        let data: CountriesMap | GeoResponse
        if (!searchQuery.isCountry && searchQuery.value.trim()) {
          data = await searchGeoQuery(searchQuery.value)
        } else {
          data = await fetchCountriesQuery()
        }
        setSearchData(Object.values(data))
      } catch (error) {
        console.error("Error fetching data:", error)
        setSearchData([])
      }
    }

    fetchData(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  return {
    searchVavue: searchQuery.value,
    searchData,
    onInputChange,
    onItemClick,
  }
}

export default useSearchInput
