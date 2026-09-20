import conexion from "../comfig/config.js"

export const obtener_info = async (req, res) => {
  try {
    const [reservas] = await conexion.execute(`
      SELECT *
      FROM reservas
      WHERE fecha_entrada >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
        AND fecha_entrada < DATE_FORMAT(CURDATE() + INTERVAL 1 MONTH, '%Y-%m-01')
    `)

    const [habitaciones] = await conexion.execute(`
      SELECT *
      FROM habitacion
    `)

    const habitacionesOcupadas = new Set(
      reservas.map(reserva => reserva.id_habitacion)
    )

    const totalHabitaciones = habitaciones.length
    const ocupadas = habitacionesOcupadas.size

    const porcentaje = totalHabitaciones > 0
      ? (ocupadas / totalHabitaciones) * 100
      : 0

    res.json({
      reservas,
      habitaciones,
      habitaciones_ocupadas: porcentaje
    })
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener info."
    })
  }
}

export const obtener_reservas_dashboard = async (req, res) => {
  try {
    const [reservas] = await conexion.execute(`
      SELECT
        r.id AS id_reserva,
        r.id_usuario,
        r.id_habitacion,
        r.fecha_entrada,
        r.fecha_salida,
        r.adultos,
        r.ninos,
        r.precio_noche,
        r.estado,

        CONCAT(
          u.nombres,
          ' ',
          u.apellidos
        ) AS nombre_usuario,

        h.numero,
        h.tipo

      FROM reservas r

      INNER JOIN usuario u
        ON r.id_usuario = u.id

      INNER JOIN habitacion h
        ON r.id_habitacion = h.id_habitacion

      ORDER BY r.fecha_entrada DESC, r.id DESC
    `)

    res.json(reservas)
  } catch (error) {
    console.error(
      "Error al obtener reservas del dashboard:",
      error
    )

    res.status(500).json({
      mensaje: "Error al obtener las reservas."
    })
  }
}

export const verificar_admin = async (req, res) => {
  const { idUsuario } = req.body

  try {
    const [resultado] = await connection.execute(
      "SELECT rol FROM usuario WHERE id = ?",
      [idUsuario]
    )

    if (resultado.length === 0) {
      return res.status(404).json({
        esAdmin: false
      })
    }

    res.json({
      esAdmin: resultado[0].rol === "admin"
    })
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al verificar usuario"
    })
  }
}