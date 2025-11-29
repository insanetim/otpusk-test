import { format } from "date-fns"
import { Link } from "react-router"
import { formatAmount } from "../lib/formatAmount"
import type { SearchTour } from "../types"

interface TourCardProps {
  tour: SearchTour
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <div className="bg-white rounded-md shadow p-4">
      <img
        className="w-full h-40 object-cover rounded-md"
        src={tour.hotelImg}
        alt={tour.hotelName}
      />
      <h2 className="mt-2 text-gray-800 font-semibold text-base">
        {tour.hotelName}
      </h2>
      <p className="mt-2">
        {tour.hotelCountry}, {tour.hotelCity}
      </p>
      <div className="flex flex-col mt-2">
        <p className="text-sm">Tour start date</p>
        <p>{format(new Date(tour.startDate), "dd.MM.yyyy")}</p>
      </div>
      <p className="mt-2 text-lg font-semibold">
        {formatAmount(tour.amount)} {tour.currency.toUpperCase()}
      </p>
      <div className="mt-2">
        <Link
          to={`/tour/?priceId=${tour.id}&hotelId=${tour.hotelId}`}
          className="text-blue-600 hover:underline"
        >
          See details
        </Link>
      </div>
    </div>
  )
}

export default TourCard
