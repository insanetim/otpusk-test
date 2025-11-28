import { useState } from "react"
import { startSearchPricesQuery } from "../api/apiClient"
import type { ErrorResponse, GetSearchPricesResponse } from "../types"

const useSearchResult = () => {
  const [data, setData] = useState<GetSearchPricesResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ErrorResponse | null>(null)

  const fetchSearchResult = async (countryId: string) => {
    try {
      const response = await startSearchPricesQuery(countryId)
      console.log("response", response)
    } catch (error) {
      console.log("error", error)
    }
  }

  return { data, loading, error, fetchSearchResult }
}

export default useSearchResult
