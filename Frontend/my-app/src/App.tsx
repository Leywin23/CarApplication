import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CarsListPage from "./pages/CarListPage";
import CarCreatePage from "./pages/CarCreatePage";
import CarEditPage from "./pages/CarEditPage";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 🔒 WSZYSTKO Z AUTAMI WYMAGA LOGOWANIA */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <CarsListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cars/new"
          element={
            <ProtectedRoute>
              <CarCreatePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cars/:id/edit"
          element={
            <ProtectedRoute>
              <CarEditPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
