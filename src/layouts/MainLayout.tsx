import { Outlet } from "react-router"

const MainLayout = () => {
  return (
    <div className="container">
      <Outlet />
    </div>
  )
}

export default MainLayout
