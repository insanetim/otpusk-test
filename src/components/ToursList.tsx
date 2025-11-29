import type { JSX } from "react"
import type { ErrorResponse, SearchTour } from "../types"
import ErrorAlert from "./ErrorAlert"
import Loading from "./Loading"
import TourCard from "./TourCard"

interface ToursListProps {
  tours: SearchTour[]
  loading: boolean
  error: ErrorResponse | null
}

const ToursList: React.FC<ToursListProps> = ({ tours, loading, error }) => {
  let content: JSX.Element

  if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorAlert error={error} />
  } else if (!tours.length) {
    content = (
      <p className="bg-white shadow rounded-md text-center text-xl p-4 max-w-[600px] mx-auto">
        No tours were found based on your request.
      </p>
    )
  } else {
    content = (
      <div className="max-w-[700px] mx-auto p-[25px] grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {tours.map(tour => (
          <TourCard
            key={tour.id}
            tour={tour}
          />
        ))}
      </div>
    )
  }

  return <div>{content}</div>
}

export default ToursList
