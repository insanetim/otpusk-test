import { Icon } from "@iconify-icon/react"
import { useEffect, type JSX } from "react"
import { Link, useSearchParams } from "react-router"
import ErrorAlert from "../components/shared/ErrorAlert"
import InfoAlert from "../components/shared/InfoAlert"
import TourDetailsCard from "../components/TourDetailsCard"
import useTourDetails from "../hooks/useTourDetails"

const TourPage = () => {
  const [searchParams] = useSearchParams()
  const priceId = searchParams.get("priceId")
  const hotelId = searchParams.get("hotelId")
  const { tourDetails, error, fetchTourDetails } = useTourDetails()

  let content: JSX.Element
  if (error) {
    content = (
      <ErrorAlert
        className="mt-8"
        error={error}
      />
    )
  } else if (!tourDetails || !priceId || !hotelId) {
    content = (
      <InfoAlert className="mt-8">
        Tour details were not found. Some required search parameters may be
        missing.
      </InfoAlert>
    )
  } else {
    content = <TourDetailsCard tourDetails={tourDetails} />
  }

  useEffect(() => {
    fetchTourDetails(priceId!, hotelId!)
  }, [fetchTourDetails, priceId, hotelId])

  return (
    <div className="flex flex-col gap-4 max-w-[700px] mx-auto">
      <div className="flex justify-start">
        <Link
          className="flex items-center gap-1 text-blue-600"
          to="/"
        >
          <Icon
            icon="tabler:arrow-left"
            style={{ fontSize: "20px" }}
          />{" "}
          Back
        </Link>
      </div>
      {content}
    </div>
  )
}

export default TourPage
