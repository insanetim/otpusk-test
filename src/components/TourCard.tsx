import { Link } from "react-router"
import { formatDate } from "../lib/formatDate"
import type { SearchTour } from "../types"
import Card from "./shared/Card"
import Image from "./shared/Image"
import Price from "./shared/Price"

interface TourCardProps {
  tour: SearchTour
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <Card>
      <Image
        src={tour.hotelImg}
        alt={tour.hotelName}
      />
      <h2 className="text-gray-800 font-semibold text-base">
        {tour.hotelName}
      </h2>
      <p>
        {tour.hotelCountry}, {tour.hotelCity}
      </p>
      <div className="flex flex-col">
        <p className="text-sm">Tour start date</p>
        <p>{formatDate(tour.startDate)}</p>
      </div>
      <Price
        amount={tour.amount}
        currency={tour.currency}
      />
      <Link
        to={`/tour/?priceId=${tour.id}&hotelId=${tour.hotelId}`}
        className="text-blue-600 hover:underline self-start"
      >
        See details
      </Link>
    </Card>
  )
}

export default TourCard
