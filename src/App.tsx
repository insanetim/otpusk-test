import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router"
import MainLayout from "./layouts/MainLayout"

const HomePage = lazy(() => import("./pages/HomePage"))
const TourPage = lazy(() => import("./pages/TourPage"))

const App = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route
          path="/"
          element={<MainLayout />}
        >
          <Route
            index
            element={<HomePage />}
          />
          <Route
            path="tour"
            element={<TourPage />}
          />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
