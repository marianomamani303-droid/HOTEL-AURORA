import Header from "../componentes/header"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../css/habitacionesusuario.css"


function Habitaciones(){
  return(
    <>
      <Header/>
      <HabitacionesMain/>
    </>
  )
}

//HABITACIONES MAIN
function HabitacionesMain(){
  const [habitaciones,sethabitaciones] = useState([])


  useEffect(() => {

  async function MostrarHabitaciones() {

    try {

      const respuesta = await fetch(
        "http://localhost:3000/MostrarHabitacionesUsuario"
      )

      const datos = await respuesta.json()

      sethabitaciones(datos)

    } catch (error) {

      console.error("Error al obtener las habitaciones:", error)

    }

  }

  MostrarHabitaciones()

}, [])


  return(
    <>
      <main>
        {
          habitaciones.map((habitacion)=>(
            <TarjetaHabitacionUsuario habitacion={habitacion} key={habitacion.id_habitacion}/>
          ))
        }
      </main>
    </>
  )
}

function TarjetaHabitacionUsuario({ habitacion }) {
  const navigate = useNavigate()

  const reservarHabitacion = () => {
    navigate("/reserva", { state: { habitacion } })
  }

  return (
    <article className="habitacion-usuario-card">

      {/* IMAGEN */}

      <div className="habitacion-usuario-imagen">

        <img
          src={habitacion.enlace_imagen}
          alt={`Habitación ${habitacion.numero}`}
        />

        <span
          className={`habitacion-usuario-estado habitacion-usuario-estado-${habitacion.estado?.toLowerCase()}`}
        >
          {habitacion.estado}
        </span>

      </div>


      {/* CONTENIDO */}

      <div className="habitacion-usuario-contenido">

        <div className="habitacion-usuario-header">

          <div>

            <span className="habitacion-usuario-numero">
              HABITACIÓN {habitacion.numero}
            </span>

            <h3 className="habitacion-usuario-titulo">
              {habitacion.tipo}
            </h3>

          </div>

          <div className="habitacion-usuario-precio">

            <strong>
              ${habitacion.precio_noche}
            </strong>

            <span>
              / noche
            </span>

          </div>

        </div>


        {/* DESCRIPCIÓN */}

        <p className="habitacion-usuario-descripcion">
          {habitacion.descripcion}
        </p>


        {/* INFORMACIÓN */}

        <div className="habitacion-usuario-datos">

          <div>
            <span>👤</span>
            <strong>{habitacion.capacidad_adultos}</strong>
            <small>Adultos</small>
          </div>

          <div>
            <span>🛏️</span>
            <strong>{habitacion.cantidad_camas}</strong>
            <small>Camas</small>
          </div>

          <div>
            <span>🚿</span>
            <strong>
              {habitacion.banio_privado ? "Sí" : "No"}
            </strong>
            <small>Baño privado</small>
          </div>

          <div>
            <span>📶</span>
            <strong>
              {habitacion.wifi ? "Sí" : "No"}
            </strong>
            <small>WiFi</small>
          </div>

        </div>


        {/* SERVICIOS */}

        <div className="habitacion-usuario-servicios">

          {(habitacion.aire_acondicionado === 1 || habitacion.aire_acondicionado === true) && (
            <span>Aire acondicionado</span>
          )}

          {(habitacion.wifi === 1 || habitacion.wifi === true) && (
            <span>WiFi</span>
          )}

          {(habitacion.tv === 1 || habitacion.tv === true) && (
            <span>TV</span>
          )}

          {(habitacion.minibar === 1 || habitacion.minibar === true) && (
            <span>Minibar</span>
          )}

          {(habitacion.balcon === 1 || habitacion.balcon === true) && (
            <span>Balcón</span>
          )}

        </div>


        {/* FOOTER */}

        <div className="habitacion-usuario-footer">

          <button
            className="habitacion-usuario-btn"
            disabled={habitacion.estado?.toLowerCase() !== "disponible"}
            onClick={reservarHabitacion}
          >
            {habitacion.estado?.toLowerCase() === "disponible"
              ? "Reservar ahora"
              : "No disponible"}
          </button>

        </div>

      </div>

    </article>
  )
}



export default Habitaciones
