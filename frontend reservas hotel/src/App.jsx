import { Routes, Route } from "react-router-dom"

import NavBar from "./componentes/navbar"
import Footer from "./componentes/Footer"
import DashboardLayout from "./componentes/DashboardLayout"
import RutaProtegida from "./componentes/rutaProtegida"

import Main from "./pages/pagina-principal"
import RegistroYLogin from "./pages/LoginRegistro"
import Dashboard from "./pages/dashboard/dashboard"
import ReservasDash from "./pages/dashboard/reservasdash"
import HabitacionesDash from "./pages/dashboard/Habitacionesdash"
import TodasLasHabitaciones from "./pages/dashboard/TLashabitacionesdash"
import Habitaciones from "./pages/Habitaciones"
import Reserva from "./pages/Reserva"
import MiReservas from "./pages/MiReservas"
import Pagos from "./pages/Pagos"

function App() {
  return (
    <Routes>

      {/* PÁGINAS PRINCIPALES */}

      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Main />
            <Footer />
          </>
        }
      />

      <Route
        path="/LoginRegistro"
        element={
          <>
            <NavBar />
            <RegistroYLogin />
            <Footer />
          </>
        }
      />

      <Route
        path="/habitaciones"
        element={
          <>
            <NavBar />
            <Habitaciones />
            <Footer />
          </>
        }
      />

      <Route
        path="/Reserva"
        element={
          <>
            <NavBar />
            <Reserva />
            <Footer />
          </>
        }
      />

      <Route
        path="/MiReservas"
        element={
          <>
            <NavBar />
            <MiReservas />
            <Footer />
          </>
        }
      />

      <Route
        path="/Pagos"
        element={
          <>
            <NavBar />
            <Pagos />
            <Footer />
          </>
        }
      />


      {/* DASHBOARD */}

<Route
  path="/dashboard"
  element={
    <RutaProtegida>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </RutaProtegida>
  }
/>


      <Route
        path="/Dashboard/Reservas"
        element={
          <DashboardLayout>
            <ReservasDash />
          </DashboardLayout>
        }
      />

      <Route
        path="/Dashboard/Habitaciones"
        element={
          <DashboardLayout>
            <HabitacionesDash />
          </DashboardLayout>
        }
      />

      <Route
        path="/Dashboard/todas-las-habitaciones"
        element={
          <DashboardLayout>
            <TodasLasHabitaciones />
          </DashboardLayout>
        }
      />

    </Routes>
  )
}

export default App