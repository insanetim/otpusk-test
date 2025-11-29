import { useSearchParams } from "react-router"

const TourPage = () => {
  const [searchParams] = useSearchParams()
  const priceId = searchParams.get("priceId")
  const hotelId = searchParams.get("hotelId")

  return (
    <div className="w-[700px] mx-auto">
      <h1>Tour Page</h1>
      <p>Price ID: {priceId}</p>
      <p>Hotel ID: {hotelId}</p>
    </div>
  )
}

export default TourPage
