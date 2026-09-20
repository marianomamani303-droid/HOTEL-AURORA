import { useState } from "react";
import "../css/FormularioHabitacion.css";

function FormularioHabitacion() {

  const [datos, setDatos] = useState({
    numero: "",
    piso: "",
    tipo: "",
    estado: "Disponible",

    capacidadAdultos: "",
    capacidadNinos: "",

    precioNoche: "",

    cantidadCamas: "",
    tipoCama: "",

    banioPrivado: false,
    aireAcondicionado: false,
    wifi: false,
    tv: false,
    minibar: false,
    balcon: false,
    accesible: false,

    vista: "",
    descripcion: ""
  });

  const [imagenes, setImagenes] = useState([]);


  const manejarCambio = (e) => {

    const { name, value, type, checked } = e.target;

    setDatos({
      ...datos,
      [name]: type === "checkbox" ? checked : value
    });

  };


  const manejarImagenes = (e) => {

    const archivos = Array.from(e.target.files);

    setImagenes(archivos);

  };


  const enviarFormulario = async (e) => {

    e.preventDefault();

    try {

      const formulario = new FormData();


      formulario.append("numero", datos.numero);
      formulario.append("piso", datos.piso);
      formulario.append("tipo", datos.tipo);
      formulario.append("estado", datos.estado);

      formulario.append(
        "capacidadAdultos",
        datos.capacidadAdultos
      );

      formulario.append(
        "capacidadNinos",
        datos.capacidadNinos
      );

      formulario.append(
        "precioNoche",
        datos.precioNoche
      );

      formulario.append(
        "cantidadCamas",
        datos.cantidadCamas
      );

      formulario.append(
        "tipoCama",
        datos.tipoCama
      );

      formulario.append(
        "banioPrivado",
        datos.banioPrivado ? 1 : 0
      );

      formulario.append(
        "aireAcondicionado",
        datos.aireAcondicionado ? 1 : 0
      );

      formulario.append(
        "wifi",
        datos.wifi ? 1 : 0
      );

      formulario.append(
        "tv",
        datos.tv ? 1 : 0
      );

      formulario.append(
        "minibar",
        datos.minibar ? 1 : 0
      );

      formulario.append(
        "balcon",
        datos.balcon ? 1 : 0
      );

      formulario.append(
        "accesible",
        datos.accesible ? 1 : 0
      );

      formulario.append("vista", datos.vista);
      formulario.append("descripcion", datos.descripcion);


      imagenes.forEach((imagen) => {

        formulario.append("imagenes", imagen);

      });


      const respuesta = await fetch(
        "http://localhost:3000/guardarhabitaciones",
        {
          method: "POST",
          body: formulario
        }
      );


      const resultado = await respuesta.json();

      alert(resultado.mensaje);


    } catch (error) {

      console.log(error);

      alert("Error al guardar la habitación");

    }

  };


  return (

    <form
      className="formulario-habitacion"
      onSubmit={enviarFormulario}
    >

      <h2>Nueva habitación</h2>

      <p>
        Completa la información para publicar una habitación.
      </p>


      <section className="form-seccion">

        <h3>Datos de la habitación</h3>

        <div className="form-grid">

          <div className="campo">

            <label>Número de habitación</label>

            <input
              type="number"
              name="numero"
              value={datos.numero}
              onChange={manejarCambio}
              placeholder="Ej: 204"
              required
            />

          </div>


          <div className="campo">

            <label>Piso</label>

            <input
              type="number"
              name="piso"
              value={datos.piso}
              onChange={manejarCambio}
              placeholder="Ej: 2"
              required
            />

          </div>


          <div className="campo">

            <label>Tipo de habitación</label>

            <select
              name="tipo"
              value={datos.tipo}
              onChange={manejarCambio}
              required
            >

              <option value="">Seleccionar</option>

              <option value="Individual">Individual</option>
              <option value="Doble">Doble</option>
              <option value="Triple">Triple</option>
              <option value="Familiar">Familiar</option>
              <option value="Suite">Suite</option>

            </select>

          </div>


          <div className="campo">

            <label>Estado</label>

            <select
              name="estado"
              value={datos.estado}
              onChange={manejarCambio}
            >

              <option value="Disponible">
                Disponible
              </option>

              <option value="Mantenimiento">
                Mantenimiento
              </option>

              <option value="Fuera de servicio">
                Fuera de servicio
              </option>

            </select>

          </div>

        </div>

      </section>


      <section className="form-seccion">

        <h3>Capacidad y precio</h3>

        <div className="form-grid">

          <div className="campo">

            <label>Adultos</label>

            <input
              type="number"
              name="capacidadAdultos"
              value={datos.capacidadAdultos}
              onChange={manejarCambio}
              min="1"
              required
            />

          </div>


          <div className="campo">

            <label>Niños</label>

            <input
              type="number"
              name="capacidadNinos"
              value={datos.capacidadNinos}
              onChange={manejarCambio}
              min="0"
            />

          </div>


          <div className="campo">

            <label>Precio por noche</label>

            <input
              type="number"
              name="precioNoche"
              value={datos.precioNoche}
              onChange={manejarCambio}
              placeholder="Ej: 85000"
              min="0"
              required
            />

          </div>

        </div>

      </section>


      <section className="form-seccion">

        <h3>Camas</h3>

        <div className="form-grid">

          <div className="campo">

            <label>Cantidad de camas</label>

            <input
              type="number"
              name="cantidadCamas"
              value={datos.cantidadCamas}
              onChange={manejarCambio}
              min="1"
              required
            />

          </div>


          <div className="campo">

            <label>Tipo de cama</label>

            <select
              name="tipoCama"
              value={datos.tipoCama}
              onChange={manejarCambio}
              required
            >

              <option value="">Seleccionar</option>

              <option value="Individual">
                Individual
              </option>

              <option value="Matrimonial">
                Matrimonial
              </option>

              <option value="Queen">
                Queen
              </option>

              <option value="King">
                King
              </option>

              <option value="Camarote">
                Camarote
              </option>

            </select>

          </div>

        </div>

      </section>


      <section className="form-seccion">

        <h3>Características</h3>

        <div className="caracteristicas">

          <label>
            <input
              type="checkbox"
              name="banioPrivado"
              checked={datos.banioPrivado}
              onChange={manejarCambio}
            />
            Baño privado
          </label>


          <label>
            <input
              type="checkbox"
              name="aireAcondicionado"
              checked={datos.aireAcondicionado}
              onChange={manejarCambio}
            />
            Aire acondicionado
          </label>


          <label>
            <input
              type="checkbox"
              name="wifi"
              checked={datos.wifi}
              onChange={manejarCambio}
            />
            Wi-Fi
          </label>


          <label>
            <input
              type="checkbox"
              name="tv"
              checked={datos.tv}
              onChange={manejarCambio}
            />
            TV
          </label>


          <label>
            <input
              type="checkbox"
              name="minibar"
              checked={datos.minibar}
              onChange={manejarCambio}
            />
            Minibar
          </label>


          <label>
            <input
              type="checkbox"
              name="balcon"
              checked={datos.balcon}
              onChange={manejarCambio}
            />
            Balcón
          </label>


          <label>
            <input
              type="checkbox"
              name="accesible"
              checked={datos.accesible}
              onChange={manejarCambio}
            />
            Accesible
          </label>

        </div>

      </section>


      <section className="form-seccion">

        <h3>Vista</h3>

        <div className="campo">

          <label>Vista de la habitación</label>

          <select
            name="vista"
            value={datos.vista}
            onChange={manejarCambio}
          >

            <option value="">Seleccionar</option>

            <option value="Ciudad">Ciudad</option>
            <option value="Exterior">Exterior</option>
            <option value="Piscina">Piscina</option>
            <option value="Jardín">Jardín</option>
            <option value="Interior">Interior</option>

          </select>

        </div>

      </section>


      <section className="form-seccion">

        <h3>Descripción</h3>

        <div className="campo">

          <label>Descripción de la habitación</label>

          <textarea
            name="descripcion"
            value={datos.descripcion}
            onChange={manejarCambio}
            placeholder="Describe la habitación..."
            rows="5"
          />

        </div>

      </section>


      <section className="form-seccion">

        <h3>Imágenes</h3>

        <div className="campo">

          <label>Imágenes de la habitación</label>

          <input
            type="file"
            name="imagenes"
            accept="image/*"
            multiple
            onChange={manejarImagenes}
          />

        </div>

      </section>


      <div className="formulario-acciones">

        <button
          type="button"
          className="boton-cancelar"
        >
          Cancelar
        </button>


        <button
          type="submit"
          className="boton-guardar"
        >
          Publicar habitación
        </button>

      </div>

    </form>

  );
}

export default FormularioHabitacion;