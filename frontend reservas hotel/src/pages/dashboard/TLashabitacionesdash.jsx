/* COMPONENTE MOSTRAR HABITACIONES */
import "../../css/TlasHabitaciones.css"

import { useEffect, useState } from "react";

function MostrarHabitaciones() {

  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {

    async function obtenerDatos() {

      try {

        const respuesta = await fetch(
          "http://localhost:3000/ObtenerHabitaciones"
        );

        const datos = await respuesta.json();

        setHabitaciones(datos);

      } catch (error) {

        console.error("Error al obtener habitaciones:", error);

      }

    }

    obtenerDatos();

  }, []);

  

  return (
    <section className="habitaciones">

      <div className="habitaciones-encabezado">

        <div>
          <p className="habitaciones-subtitulo">
            HOTEL
          </p>

          <h2 className="habitaciones-titulo">
            Habitaciones
          </h2>
        </div>

        <span className="habitaciones-cantidad">
          {habitaciones.length} habitaciones
        </span>

      </div>


      <div className="habitaciones-lista">

        {habitaciones.map((habitacion) => (
          <TarjetaHabitacion
            key={habitacion.id}
            habitacion={habitacion}
          />
        ))}

      </div>

    </section>
  );
}


/* TARJETA HABITACION */

function TarjetaHabitacion({ habitacion }) {

  //ELIMINAR HABITACION
  async function EliminarHabitacion(){
    try {
      const respuesta = await fetch("http://localhost:3000/DeleteHabitacion",{
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        },
        body:JSON.stringify({
          id:habitacion.id_habitacion
        })
      })

      const datos = await respuesta.json()
      alert(datos.mensaje)
      location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <article className="habitacion-card">

      <div className="habitacion-card-imagen">

        <img
          src={habitacion.enlace_imagen}
          alt={`Habitación ${habitacion.numero}`}
        />

        <span
          className={`habitacion-estado habitacion-estado-${habitacion.estado?.toLowerCase()}`}
        >
          {habitacion.estado}
        </span>

      </div>


      <div className="habitacion-card-contenido">

        <div className="habitacion-card-header">

          <div>

            <p className="habitacion-card-numero">
              HABITACIÓN {habitacion.numero}
            </p>

            <h3 className="habitacion-card-title">
              {habitacion.tipo}
            </h3>

          </div>

          <strong className="habitacion-card-precio">
            ${habitacion.precio_noche}
            <small>/ noche</small>
          </strong>

        </div>


        <p className="habitacion-card-descripcion">
          {habitacion.descripcion}
        </p>


        <div className="habitacion-datos">

          <div className="habitacion-dato">
            <span>PISO</span>
            <strong>{habitacion.piso}</strong>
          </div>

          <div className="habitacion-dato">
            <span>ADULTOS</span>
            <strong>{habitacion.capacidad_adultos}</strong>
          </div>

          <div className="habitacion-dato">
            <span>NIÑOS</span>
            <strong>{habitacion.capacidad_ninos}</strong>
          </div>

          <div className="habitacion-dato">
            <span>CAMAS</span>
            <strong>{habitacion.cantidad_camas}</strong>
          </div>

          <div className="habitacion-dato">
            <span>CAMA</span>
            <strong>{habitacion.tipo_cama}</strong>
          </div>

          <div className="habitacion-dato">
            <span>VISTA</span>
            <strong>{habitacion.vista}</strong>
          </div>

        </div>


        <div className="habitacion-servicios">

          {habitacion.banio_privado && (
            <span>Baño privado</span>
          )}

          {habitacion.aire_acondicionado && (
            <span>Aire acondicionado</span>
          )}

          {habitacion.wifi && (
            <span>WiFi</span>
          )}

          {habitacion.tv && (
            <span>TV</span>
          )}

          {habitacion.minibar && (
            <span>Minibar</span>
          )}

          {habitacion.balcon && (
            <span>Balcón</span>
          )}

          {habitacion.accesible && (
            <span>Accesible</span>
          )}

        </div>


        <div className="habitacion-card-footer">

          <div className="habitacion-acciones">

            <button className="habitacion-btn-editar">
              Editar
            </button>

            <button className="habitacion-btn-eliminar" onClick={EliminarHabitacion}>
              Eliminar
            </button>

          </div>

        </div>

      </div>

    </article>
  );
}


export default MostrarHabitaciones;