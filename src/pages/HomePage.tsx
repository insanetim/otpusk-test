import { useCallback } from "react"
import SearchForm from "../components/SearchForm"
import ToursList from "../components/ToursList"
import useSearchTours from "../hooks/useSearchTours"
import { selectSearchParams } from "../store/features/searchInputSlice"
import { useAppSelector } from "../store/hooks"

const HomePage = () => {
  const { countryId } = useAppSelector(selectSearchParams)
  const { isFirstLoad, searchTours, loading, error, fetchSearchTours } =
    useSearchTours()

  const handleSubmit = useCallback(() => {
    if (!countryId) return
    fetchSearchTours(countryId)
  }, [countryId, fetchSearchTours])

  return (
    <div className="flex flex-col justify-center gap-8">
      <SearchForm onSubmit={handleSubmit} />
      {!isFirstLoad ? (
        <ToursList
          tours={searchTours}
          loading={loading}
          error={error}
        />
      ) : (
        <div className="text-center text-gray-500">
          Select a country from the list to start searching
        </div>
      )}
    </div>
  )
}

export default HomePage
