import { Outlet } from "react-router"

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-300">
      <div className="container mx-auto px-2">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
