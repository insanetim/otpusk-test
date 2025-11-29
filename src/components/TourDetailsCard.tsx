import { Icon } from "@iconify-icon/react"
import { formatDate } from "../lib/formatDate"
import type { TourDetails } from "../types"
import Card from "./shared/Card"
import Image from "./shared/Image"
import Price from "./shared/Price"
import TourDetailsServices from "./TourDetailsServices"

interface TourDetailsCardProps {
  tourDetails: TourDetails
}

const TourDetailsCard: React.FC<TourDetailsCardProps> = ({ tourDetails }) => {
  return (
    <Card>
      <h1 className="text-gray-800 font-bold text-3xl">
        {tourDetails.hotelName}
      </h1>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <div className="flex items-center gap-2">
          <Icon icon="tabler:map-pin" /> {tourDetails.hotelCountry}
        </div>
        <div className="flex items-center gap-2">
          <Icon icon="tabler:building-community" /> {tourDetails.hotelCity}
        </div>
      </div>
      <Image
        className="h-60"
        src={tourDetails.hotelImg}
        alt={tourDetails.hotelName}
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-gray-800 text-xl font-semibold">Description</h3>
        <p>{tourDetails.hotelDescription}</p>
      </div>
      {tourDetails.hotelServices && (
        <TourDetailsServices services={tourDetails.hotelServices} />
      )}
      <hr className="border-t-gray-200" />
      <div className="flex items-center gap-2">
        <Icon icon="tabler:calendar-check" />{" "}
        {formatDate(tourDetails.startDate)}
      </div>
      <Price
        amount={tourDetails.amount}
        currency={tourDetails.currency}
      />
    </Card>
  )
}

export default TourDetailsCard
