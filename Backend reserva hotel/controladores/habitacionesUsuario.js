import conexion from "../comfig/config.js"

export const MHabitacionesUsuario = async (req,res)=>{
  try {
    const [Habitaciones] = await conexion.execute("SELECT * FROM habitacion")
    res.json(Habitaciones)
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener habitaciones",
      error: error.message
    })

  }
}

export const habitaciones_destacadas = async (req, res) => {
  try {
    const [resultado] = await conexion.execute(`
      SELECT *
      FROM habitacion
      WHERE numero IN (20, 80, 100)
      ORDER BY FIELD(numero, 20, 80, 100)
    `)

    res.json(resultado)

  } catch (error) {
    console.error("Error al obtener las habitaciones destacadas:", error)
    res.status(500).json({
      mensaje: "Error al obtener las habitaciones destacadas"
    })
  }
}