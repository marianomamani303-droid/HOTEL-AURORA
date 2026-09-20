import conexion from "../comfig/config.js"
import cloudinary from "../comfig/claudinaryconfig.js"

export const crearHabitacion = async (req, res) => {

  const {
    numero,
    piso,
    tipo,
    estado,
    capacidadAdultos,
    capacidadNinos,
    precioNoche,
    cantidadCamas,
    tipoCama,
    banioPrivado,
    aireAcondicionado,
    wifi,
    tv,
    minibar,
    balcon,
    accesible,
    vista,
    descripcion
  } = req.body

  try {

    let imagenUrl = null

    // SUBIR IMAGEN A CLOUDINARY

    if (req.files && req.files.length > 0) {

      const imagen = req.files[0]

      const resultado = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "habitaciones"
          },
          (error, resultado) => {

            if (error) {
              reject(error)
            } else {
              resolve(resultado)
            }

          }
        )

        stream.end(imagen.buffer)

      })

      imagenUrl = resultado.secure_url

    }

    // GUARDAR HABITACIÓN EN MYSQL

    const [resultado] = await conexion.execute(
  `INSERT INTO habitacion (
    numero,
    piso,
    tipo,
    estado,
    capacidad_adultos,
    capacidad_ninos,
    precio_noche,
    cantidad_camas,
    tipo_cama,
    banio_privado,
    aire_acondicionado,
    wifi,
    tv,
    minibar,
    balcon,
    accesible,
    vista,
    descripcion,
    enlace_imagen
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    numero,
    piso,
    tipo,
    estado,
    capacidadAdultos,
    capacidadNinos,
    precioNoche,
    cantidadCamas,
    tipoCama,
    banioPrivado,
    aireAcondicionado,
    wifi,
    tv,
    minibar,
    balcon,
    accesible,
    vista,
    descripcion,
    imagenUrl
  ]
)

    res.status(201).json({
      mensaje: "Habitación creada correctamente",
      id: resultado.insertId,
      imagen: imagenUrl
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      mensaje: "Error al crear la habitación",
      error: error.message
    })

  }

}

export const obtenerHabitaciones = async (req, res) => {

  try {

    const [habitaciones] = await conexion.execute(
      "SELECT * FROM habitacion"
    )

    res.json(habitaciones)

  } catch (error) {

    res.status(500).json({
      mensaje: "Error al obtener habitaciones",
      error: error.message
    })

  }

}

export const DeleteHabitacion = async (req,res)=>{
  const {id} = req.body
  try {
    await conexion.execute("DELETE FROM habitacion WHERE id_habitacion = ?",[id])

    res.json({
      mensaje: "Habitacion eliminada."
    })
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar habitaciones",
      error: error.message
  })
}}

