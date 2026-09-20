
import "../css/pagina-principal.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ConocerHotel from "../assets/pexels-kaipro-28238364.jpg"
import Wifi from "../assets/wifi.jpg"
import Restaurante from "../assets/restaurante.jpg"
import Piscina from "../assets/piscina.jpg"
import Spa from "../assets/spa.jpg"
import Estacionamiento from "../assets/estacionamiento.jpg"
import Header from "../componentes/header"

function Main() {
  return (
    <>
      <Header />

      <main>

        <ConoceNuestroHotel />

        <HabitacionesDestacadas />

        <Servicios />
      </main>
    </>
  )
}


// SERVICIOS

function Servicios() {
  const servicios = [
    {
      nombre: "Wi-Fi",
      descripcion: "Conexión rápida y estable durante toda tu estadía.",
      imagen: Wifi
    },
    {
      nombre: "Restaurante",
      descripcion: "Disfrutá de una variedad de platos y sabores.",
      imagen: Restaurante
    },
    {
      nombre: "Piscina",
      descripcion: "Un espacio ideal para relajarte y disfrutar.",
      imagen: Piscina
    },
    {
      nombre: "Spa",
      descripcion: "Relajate y disfrutá de un momento de bienestar.",
      imagen: Spa
    },
    {
      nombre: "Estacionamiento",
      descripcion: "Espacio seguro y cómodo para tu vehículo.",
      imagen: Estacionamiento
    }
  ]

  return (
    <section className="servicios">

      <div className="servicios-header">
        <h2>Nuestros servicios</h2>

        <p>
          Todo lo que necesitás para disfrutar
          una estadía cómoda y placentera.
        </p>
      </div>

      <div className="servicios-grid">
        {servicios.map((servicio) => (
          <article
            className="servicio-card tarjeta"
            key={servicio.nombre}
          >
            <div className="servicio-imagen">
              <img
                src={servicio.imagen}
                alt={servicio.nombre}
                className="imagen"
              />
            </div>

            <div className="servicio-info">
              <h3>{servicio.nombre}</h3>

              <p>{servicio.descripcion}</p>
            </div>
          </article>
        ))}
      </div>

    </section>
  )
}


// CONOCE NUESTRO HOTEL

function ConoceNuestroHotel() {
  return (
    <article className="conoce-hotel tarjeta">
      <div className="contenedor-imagen">
        <img
          src={ConocerHotel}
          alt="Hotel Aurora"
          className="imagen"
        />
      </div>

      <div className="contenedor-informacion">
        <h2>Conocé nuestro hotel</h2>

        <p>
          Una experiencia única para disfrutar tu estadía,
          con comodidad, tranquilidad y todo lo que necesitás.
        </p>
      </div>
    </article>
  )
}


// HABITACIONES DESTACADAS

function HabitacionesDestacadas() {
  const [habitaciones, setHabitaciones] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtenerHabitaciones = async () => {
      try {
        const respuesta = await fetch(
          "http://localhost:3000/HabitacionesDestacadas"
        )

        const resultado = await respuesta.json()

        setHabitaciones(resultado)

      } catch (error) {
        console.error(
          "Error al obtener las habitaciones:",
          error
        )
      } finally {
        setCargando(false)
      }
    }

    obtenerHabitaciones()
  }, [])

  return (
    <section className="habitaciones-destacadas">

      <div className="habitaciones-header">
        <h2>Habitaciones destacadas</h2>

        <p>
          Descubrí algunos de los espacios disponibles
          para tu próxima estadía.
        </p>
      </div>

      {cargando ? (
        <p className="mensaje-habitaciones">
          Cargando habitaciones...
        </p>
      ) : (
        <div className="habitaciones-grid">
          {habitaciones.map((habitacion) => (
            <HabitacionCard
              key={habitacion.id_habitacion}
              habitacion={habitacion}
            />
          ))}
        </div>
      )}

    </section>
  )
}


// CARD HABITACIÓN

function HabitacionCard({ habitacion }) {
  const navigate = useNavigate()

  return (
    <article className="habitacion-card tarjeta">

      <div className="habitacion-imagen">
        <img
          src={habitacion.enlace_imagen}
          alt={`Habitación ${habitacion.numero}`}
          className="imagen"
        />
      </div>

      <div className="habitacion-info">

        <span className="habitacion-tipo">
          {habitacion.tipo}
        </span>

        <h3>
          Habitación {habitacion.numero}
        </h3>

        <p>
          {habitacion.descripcion}
        </p>

        <div className="habitacion-footer">

          <span className="habitacion-precio">
            ${Number(habitacion.precio_noche).toLocaleString("es-AR")}
            <small> / noche</small>
          </span>

          <button
            className="boton boton-secundario"
            onClick={() => navigate("/habitaciones")}
          >
            Ver habitaciones
          </button>

        </div>

      </div>

    </article>
  )
}

export default Main
