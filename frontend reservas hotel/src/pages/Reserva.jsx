import { useLocation } from "react-router-dom"
import ReservaFormulario from "../componentes/formularioReserva"
import "../css/reserva.css"

function Reserva() {
  const { state } = useLocation()
  const habitacion = state?.habitacion

  console.log(habitacion)
  return (
    <main className="pagina-reserva">
      <ReservaFormulario habitacion={habitacion} />
    </main>
  )
}

export default Reserva
