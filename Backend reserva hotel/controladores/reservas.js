import mysql from "mysql2/promise"
import connection from "../comfig/config.js"

export const guardar_reserva = async (req, res) => {
  const {
    idHabitacion,
    idUsuario,
    FechaDeEntrada,
    FechaDeSalida,
    Adultos,
    Ninos,
    precioNoche
  } = req.body

  try {
    await connection.execute(
      "INSERT INTO reservas (id_usuario, id_habitacion, fecha_entrada, fecha_salida, adultos, ninos, precio_noche) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        idUsuario,
        idHabitacion,
        FechaDeEntrada,
        FechaDeSalida,
        Adultos,
        Ninos,
        precioNoche
      ]
    )

    res.json({
      mensaje: "Habitación reservada correctamente."
    })
  } catch (error) {

    res.status(500).json({
      mensaje: "Error al reservar habitación"
    })
  }
}


export const obtener_reservas = async (req, res) => {
  const { idUsuario } = req.body

  try {
    const [filas] = await connection.execute(
      `SELECT
        r.*,
        r.id AS id_reserva,
        h.*
      FROM reservas AS r
      INNER JOIN habitacion AS h
        ON r.id_habitacion = h.id_habitacion
      WHERE r.id_usuario = ?`,
      [idUsuario]
    )

    res.json(filas)

  } catch (error) {
    console.log(error)

    res.status(500).json({
      mensaje: "Error al obtener las reservas."
    })
  }
}

export const obtener_pagos = async (req, res) => {
  const { idUsuario } = req.body

  try {
    const [resultado] = await connection.execute(`
      SELECT
        reservas.id AS id_reserva,
        reservas.id_usuario,
        reservas.id_habitacion,
        reservas.fecha_entrada,
        reservas.fecha_salida,
        reservas.adultos,
        reservas.ninos,
        habitacion.numero,
        habitacion.descripcion,
        habitacion.precio_noche
      FROM reservas
      INNER JOIN habitacion
        ON reservas.id_habitacion = habitacion.id_habitacion
      WHERE reservas.id_usuario = ?
    `, [idUsuario])

    if (resultado.length === 0) {
      return res.status(404).json({
        mensaje: "No hay reservas efectuadas."
      })
    }

    const reservasConTotal = resultado.map(reserva => {
      const entrada = new Date(reserva.fecha_entrada)
      const salida = new Date(reserva.fecha_salida)

      const diferencia = salida.getTime() - entrada.getTime()

      const noches = Math.ceil(
        diferencia / (1000 * 60 * 60 * 24)
      )

      const total =
        Number(reserva.precio_noche) * noches

      return {
        ...reserva,
        noches,
        total
      }
    })

    res.json({
      mensaje: "Reservas obtenidas correctamente.",
      resultado: reservasConTotal
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      mensaje: "Error al obtener las reservas.",
      error: error.message
    })
  }
}