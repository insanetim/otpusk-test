import { Icon } from "@iconify-icon/react"
import { Link, useSearchParams } from "react-router"
import Card from "../components/shared/Card"
import Image from "../components/shared/Image"
import Price from "../components/shared/Price"

const TourPage = () => {
  const [searchParams] = useSearchParams()
  const priceId = searchParams.get("priceId")
  const hotelId = searchParams.get("hotelId")

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
      <Card>
        <h1 className="text-gray-800 font-bold text-3xl">Grand Resort</h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Icon icon="tabler:map-pin" /> Spain
          </div>
          <div className="flex items-center gap-2">
            <Icon icon="tabler:building-community" /> Barcelona
          </div>
        </div>
        <Image
          className="h-60"
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="Grand Resort"
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-gray-800 text-xl font-semibold">Description</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
            veniam perferendis voluptates! Porro et placeat, voluptatibus
            assumenda consequuntur iste tempore rerum. Dignissimos iure culpa,
            maiores nobis perspiciatis vel temporibus aspernatur!
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-gray-800 text-xl font-semibold">Services</h3>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Icon icon="tabler:map-pin" /> Spain
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="tabler:map-pin" /> Spain
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="tabler:map-pin" /> Spain
            </div>
          </div>
        </div>
        <hr className="border-t-gray-200" />
        <div className="flex items-center gap-2">
          <Icon icon="tabler:map-pin" /> Spain
        </div>
        <Price
          amount={1000}
          currency="EUR"
        />
      </Card>
    </div>
  )
}

export default TourPage
