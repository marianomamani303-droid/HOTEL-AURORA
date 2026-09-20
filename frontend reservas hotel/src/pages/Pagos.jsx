
import { useEffect, useState } from "react"
import "../css/cuenta.css"
import "../css/pagos.css"

function Pagos() {
  const [reserva, setReserva] = useState([])

  async function infoPago() {
    const idUsuario = localStorage.getItem("id")

    try {
      const respuesta = await fetch("http://localhost:3000/InfoDelPago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idUsuario
        })
      })

      const datos = await respuesta.json()

      setReserva(datos.resultado || [])
    } catch (error) {
      console.error("Error al obtener los pagos:", error)
    }
  }

  useEffect(() => {
    infoPago()
  }, [])

  return (
    <section className="pagos-container">

      {reserva.length === 0 ? (
        <p className="pagos-vacio">
          No tienes reservas realizadas.
        </p>
      ) : (
        reserva.map((reserv) => (
          <article className="pagos-card" key={reserv.id_reserva}>

            <header className="pagos-header">
              <div>
                <span>HABITACIÓN</span>
                <h2>{reserv.numero}</h2>
              </div>

              <div>
                <span>PRECIO POR NOCHE</span>
                <p>${reserv.precio_noche}</p>
              </div>
            </header>

            <div className="pagos-main">

              <div className="pagos-fechas">
                <div>
                  <span>FECHA DE ENTRADA</span>
                  <p>{reserv.fecha_entrada}</p>
                </div>

                <div>
                  <span>FECHA DE SALIDA</span>
                  <p>{reserv.fecha_salida}</p>
                </div>
              </div>

              <div className="pagos-total">
                <span>TOTAL PAGADO</span>
                <h3>${reserv.total}</h3>
              </div>

            </div>

            <footer className="pagos-footer">
              <p>Este servicio actualmente se encuentra abonado.</p>
            </footer>

          </article>
        ))
      )}

    </section>
  )
}

export default Pagos

