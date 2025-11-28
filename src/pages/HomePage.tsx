import { useCallback, useState } from "react"
import SearchForm from "../components/SearchForm"
import ToursList from "../components/ToursList"
import useSearchPrices from "../hooks/useSearchPrices"
import { selectSearchParams } from "../store/features/searchInputSlice"
import { useAppSelector } from "../store/hooks"

const HomePage = () => {
  const { countryId } = useAppSelector(selectSearchParams)
  const { pricesList, loading, error, fetchSearchResult } = useSearchPrices()
  const [searchPerformed, setSearchPerformed] = useState(false)

  const handleSubmit = useCallback(() => {
    if (!searchPerformed) setSearchPerformed(true)
    fetchSearchResult(countryId)
  }, [countryId, fetchSearchResult, searchPerformed])

  return (
    <div className="pt-20">
      <div className="flex flex-col justify-center gap-16">
        <SearchForm onSubmit={handleSubmit} />
        {searchPerformed && (
          <ToursList
            prices={Object.values(pricesList)}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  )
}

export default HomePage
