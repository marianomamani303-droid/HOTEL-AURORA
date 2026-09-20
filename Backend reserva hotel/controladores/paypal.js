
import {
  OrdersController,
  CheckoutPaymentIntent
} from "@paypal/paypal-server-sdk"

import paypalClient from "../comfig/paypalconfig.js"
import connection from "../comfig/config.js"

const ordersController = new OrdersController(paypalClient)


// PAYPAL — CREAR ORDEN

export const crear_orden = async (req, res) => {
  const { idReserva } = req.body

  try {
    const [filas] = await connection.execute(
      `SELECT
        id,
        fecha_entrada,
        fecha_salida,
        precio_noche,
        estado
      FROM reservas
      WHERE id = ?`,
      [idReserva]
    )

    if (filas.length === 0) {
      return res.status(404).json({
        mensaje: "No se encontró la reserva."
      })
    }

    const reserva = filas[0]

    if (reserva.estado === "pagado") {
      return res.status(400).json({
        mensaje: "Esta reserva ya fue pagada."
      })
    }

    const entrada = new Date(reserva.fecha_entrada)
    const salida = new Date(reserva.fecha_salida)

    const diferencia =
      salida.getTime() - entrada.getTime()

    const noches = Math.ceil(
      diferencia / (1000 * 60 * 60 * 24)
    )

    if (noches <= 0) {
      return res.status(400).json({
        mensaje: "Las fechas de la reserva no son válidas."
      })
    }

    const total =
      Number(reserva.precio_noche) * noches


    const { result } =
      await ordersController.createOrder({
        body: {
          intent: CheckoutPaymentIntent.Capture,

          purchaseUnits: [
            {
              amount: {
                currencyCode: "USD",
                value: total.toFixed(2)
              }
            }
          ]
        }
      })

    if (!result?.id) {
      throw new Error(
        "PayPal no devolvió un ID de orden."
      )
    }

    res.json({
      id: result.id
    })

  } catch (error) {
    console.error(
      "ERROR AL CREAR ORDEN PAYPAL:",
      error
    )

    res.status(500).json({
      mensaje: "Error al crear la orden de PayPal."
    })
  }
}


// PAYPAL — CAPTURAR ORDEN

export const capturar_orden = async (req, res) => {
  const { orderID } = req.params
  const { idReserva } = req.body

  try {

    const [filas] = await connection.execute(
      `SELECT
        id,
        estado
      FROM reservas
      WHERE id = ?`,
      [idReserva]
    )

    if (filas.length === 0) {
      return res.status(404).json({
        mensaje: "No se encontró la reserva."
      })
    }

    const reserva = filas[0]

    if (reserva.estado === "pagado") {
      return res.status(400).json({
        mensaje: "Esta reserva ya fue pagada."
      })
    }

    const { result } =
      await ordersController.captureOrder({
        id: orderID
      })

    console.log(
      "ESTADO PAYPAL:",
      result?.status
    )

    if (result?.status !== "COMPLETED") {
      return res.status(400).json({
        mensaje: "El pago no fue completado.",
        estado: result?.status
      })
    }

    await connection.execute(
      `UPDATE reservas
       SET estado = 'finalizadaw'
       WHERE id = ?`,
      [idReserva]
    )

    res.json({
      mensaje: "Pago realizado correctamente.",
      estado: "pagado"
    })

  } catch (error) {
    console.error(
      "ERROR AL CAPTURAR PAYPAL:",
      error
    )

    res.status(500).json({
      mensaje: "Error al capturar el pago."
    })
  }
}
