import type { JSX } from "react"
import type { ErrorResponse, PriceOffer } from "../types"
import ErrorAlert from "./ErrorAlert"
import Loading from "./Loading"
import TourCard from "./TourCard"

interface ToursListProps {
  prices: PriceOffer[]
  loading: boolean
  error: ErrorResponse | null
}

const ToursList: React.FC<ToursListProps> = ({ prices, loading, error }) => {
  let content: JSX.Element

  if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorAlert error={error} />
  } else if (!prices.length) {
    content = (
      <p className="bg-white shadow rounded-md text-center text-2xl p-4 max-w-[600px] mx-auto">
        No tours were found based on your request.
      </p>
    )
  } else {
    content = (
      <div className="flex flex-wrap justify-center gap-4">
        {prices.map(price => (
          <TourCard
            key={price.id}
            price={price}
          />
        ))}
      </div>
    )
  }

  return <div>{content}</div>
}

export default ToursList
