import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { Route, BrowserRouter as Router, Routes } from "react-router"
import App from "./App.tsx"
import "./index.css"
import { store } from "./store"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={<App />}
          />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
)
