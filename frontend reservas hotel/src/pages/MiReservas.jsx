import { useEffect, useState } from "react"
import "../css/cuenta.css"

import { PayPalProvider } from "@paypal/react-paypal-js/sdk-v6"

import PagoPayPal from "../componentes/botonPaypal"

function MiReservas() {
  const [reservas, setReservas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controlador = new AbortController()

    async function obtenerReservas() {
      const idUsuario = localStorage.getItem("id")

      if (!idUsuario) {
        setError("No se encontró el usuario.")
        setCargando(false)
        return
      }

      try {
        setCargando(true)
        setError("")

        const respuesta = await fetch(
          "http://localhost:3000/MisReservas",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              idUsuario
            }),
            signal: controlador.signal
          }
        )

        if (!respuesta.ok) {
          throw new Error("No se pudieron obtener las reservas.")
        }

        const datos = await respuesta.json()

        if (!Array.isArray(datos)) {
          throw new Error("El servidor devolvió un formato inválido.")
        }

        setReservas(datos)
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error al obtener reservas:", error)

          setError(
            error.message ||
            "Ocurrió un error al cargar las reservas."
          )
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false)
        }
      }
    }

    obtenerReservas()

    return () => controlador.abort()
  }, [])

  function formatearFecha(fecha) {
    if (!fecha) {
      return "—"
    }

    return String(fecha).split("T")[0]
  }

  function obtenerEstadoClase(estado) {
    if (!estado) {
      return "sin-estado"
    }

    return String(estado)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
  }

  console.log(
  "PAYPAL CLIENT ID:",
  import.meta.env.VITE_PAYPAL_CLIENT_ID
)

  return (
    <PayPalProvider
      clientId={import.meta.env.VITE_PAYPAL_CLIENT_ID}
      environment="sandbox"
      components={["paypal-payments"]}
      pageType="checkout"
    >
      <main className="pagina-cuenta">

        <section className="cuenta-encabezado">

          <p className="etiqueta">
            ESTADÍAS
          </p>

          <h1>
            Mis reservas
          </h1>

          <p>
            Consultá el detalle y el estado de tus próximas estadías.
          </p>

        </section>


        {cargando && (
          <p className="cuenta-estado">
            Cargando reservas…
          </p>
        )}


        {!cargando && error && (
          <p
            className="cuenta-estado cuenta-estado-error"
            role="alert"
          >
            {error}
          </p>
        )}


        {!cargando && !error && reservas.length === 0 && (
          <p className="cuenta-estado">
            Todavía no tenés reservas registradas.
          </p>
        )}


        {!cargando && !error && reservas.length > 0 && (
          <section
            className="reservas-lista"
            aria-label="Listado de reservas"
          >

            {reservas.map((reserva) => {

              const estadoClase = obtenerEstadoClase(
                reserva.estado
              )

              return (
                <article
                  className="reserva-card"
                  key={reserva.id_reserva}
                >

                  <header className="reserva-card-encabezado">

                    <div>

                      <span className="reserva-card-etiqueta">
                        RESERVA
                      </span>

                      <h2>
                        Habitación {reserva.numero ?? "—"}
                      </h2>

                      <p>
                        {reserva.tipo ?? "Habitación"}
                      </p>

                    </div>


                    <div className="reserva-card-estado-contenedor">

                      <span>
                        Estado
                      </span>

                      <strong
                        className={`reserva-card-estado reserva-card-estado-${estadoClase}`}
                      >
                        {reserva.estado ?? "Sin estado"}
                      </strong>

                    </div>

                  </header>


                  <div className="reserva-card-datos">

                    <div>
                      <span>
                        Fecha de entrada
                      </span>

                      <strong>
                        {formatearFecha(reserva.fecha_entrada)}
                      </strong>
                    </div>


                    <div>
                      <span>
                        Fecha de salida
                      </span>

                      <strong>
                        {formatearFecha(reserva.fecha_salida)}
                      </strong>
                    </div>


                    <div>
                      <span>
                        Adultos
                      </span>

                      <strong>
                        {reserva.adultos ?? "—"}
                      </strong>
                    </div>


                    <div>
                      <span>
                        Niños
                      </span>

                      <strong>
                        {reserva.ninos ?? "—"}
                      </strong>
                    </div>


                    <div>
                      <span>
                        Precio por noche
                      </span>

                      <strong>
                        {reserva.precio_noche != null
                          ? `$${reserva.precio_noche}`
                          : "—"}
                      </strong>
                    </div>

                  </div>


                  <footer className="reserva-card-pie">

                    <div>

                      <span>
                        ID de reserva
                      </span>

                      <strong>
                        #{reserva.id_reserva ?? "—"}
                      </strong>

                    </div>


                    <div className="reserva-card-acciones">

                      <PagoPayPal
                        idReserva={reserva.id_reserva}
                      />

                    </div>

                  </footer>

                </article>
              )
            })}

          </section>
        )}

      </main>
    </PayPalProvider>
  )
}

export default MiReservas