import { useEffect, useState } from "react"
import "../../css/dashboard.css"

function Dashboard() {
  const [datos, setDatos] = useState(null)

  useEffect(() => {
    async function obtenerInfo() {
      try {
        const info = await fetch("http://localhost:3000/obtener-info")
        const resultado = await info.json()

        setDatos(resultado)
      } catch (error) {
        console.error("Error al obtener información:", error)
      }
    }

    obtenerInfo()
  }, [])

  if (!datos) {
    return <main className="dashboard">Cargando...</main>
  }

  const reservas = datos.reservas.length
  const habitaciones = datos.habitaciones.length
  const ocupacion = datos.habitaciones_ocupadas

  return (
    <main className="dashboard">

      <section className="dashboard-header">
        <div>
          <h1>Bienvenido al Dashboard</h1>
          <p>Resumen general del hotel</p>
        </div>
      </section>

      <section className="dashboard-stats">

        <article className="stat-card">
          <div>
            <p>Reservas</p>
            <h2>{reservas}</h2>
          </div>

          <small>Este mes</small>
        </article>

        <article className="stat-card">
          <div>
            <p>Habitaciones disponibles</p>
            <h2>{habitaciones}</h2>
          </div>

          <small>Total de habitaciones</small>
        </article>

        <article className="stat-card">
          <div>
            <p>Ocupación</p>
            <h2>{ocupacion.toFixed(0)}%</h2>
          </div>

          <small>Este mes</small>
        </article>

      </section>

      <section className="dashboard-content">

        <article className="dashboard-panel">

          <div className="panel-header">
            <div>
              <h2>Reservas recientes</h2>
              <p>Últimas reservas realizadas</p>
            </div>

            <button>Ver todas</button>
          </div>

          <div className="mini-reservations">

            {datos.reservas.slice(0, 3).map((reserva) => (
              <div className="mini-reservation" key={reserva.id_reserva}>

                <div className="client-avatar">
                  {reserva.id_usuario}
                </div>

                <div>
                  <strong>Reserva #{reserva.id_reserva}</strong>
                  <span>Habitación {reserva.id_habitacion}</span>
                </div>

                <small>
                  {reserva.fecha_entrada?.split("T")[0]}
                </small>

              </div>
            ))}

          </div>

        </article>

      </section>

    </main>
  )
}

export default Dashboard