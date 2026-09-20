import "../css/reservaformulario.css"
import { useState } from "react"

function ReservaFormulario({ habitacion }) {

  const [formreserva, setformreserva] = useState({
    fechaDeEntrada: "",
    fechaDeSalida: "",
    adultos: "1",
    ninos: "0"
  })

  function datosReserva(e) {
    const { name, value } = e.target

    setformreserva({
      ...formreserva,
      [name]: value
    })
  }

  async function enviarReserva(e) {
  e.preventDefault()

  const idUsuario = localStorage.getItem("id")

  try {
    const respuesta = await fetch(
      "http://localhost:3000/guardarReserva",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idHabitacion: habitacion.id_habitacion,
          idUsuario: idUsuario,
          FechaDeEntrada: formreserva.fechaDeEntrada,
          FechaDeSalida: formreserva.fechaDeSalida,
          Adultos: formreserva.adultos,
          Ninos: formreserva.ninos,
          precioNoche: habitacion.precio_noche
        })
      }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)

  } catch (error) {
    console.log(error)
  }
}

  return (
    <form
      className="formulario-reserva"
      onSubmit={enviarReserva}
    >

      <header className="reserva-header">

        <div className="habitacion-info">
          <span>HABITACIÓN</span>
          <h2>{habitacion.numero}</h2>
        </div>

        <div className="precio-info">
          <strong>${habitacion.precio_noche}</strong>
          <span>/ noche</span>
        </div>

      </header>

      <section className="reserva-seccion">

        <h3>Estadía</h3>

        <div className="entrada-y-salida">

          <div className="campo-reserva">
            <label htmlFor="fechaEntrada">
              Fecha de entrada
            </label>

            <input
              id="fechaEntrada"
              name="fechaDeEntrada"
              type="date"
              onChange={datosReserva}
              required
            />
          </div>

          <div className="campo-reserva">
            <label htmlFor="fechaSalida">
              Fecha de salida
            </label>

            <input
              id="fechaSalida"
              name="fechaDeSalida"
              type="date"
              onChange={datosReserva}
              required
            />
          </div>

        </div>

      </section>

      <section className="reserva-seccion">

        <h3>Huéspedes</h3>

        <div className="ninos-y-adultos">

          <div className="campo-reserva">

            <label htmlFor="adultos">
              Adultos
            </label>

            <input
              id="adultos"
              name="adultos"
              type="number"
              min="1"
              max={habitacion.capacidad_adultos}
              onChange={datosReserva}
              required
              value={formreserva.adultos}
            />

            <small>
              Máximo {habitacion.capacidad_adultos}
            </small>

          </div>

          <div className="campo-reserva">

            <label htmlFor="ninos">
              Niños
            </label>

            <input
              id="ninos"
              name="ninos"
              type="number"
              min="0"
              onChange={datosReserva}
              required
              value={formreserva.ninos}
            />

          </div>

        </div>

      </section>

      <button
        type="submit"
        className="reserva-btn"
      >
        Confirmar reserva
      </button>

    </form>
  )
}

export default ReservaFormulario
