import {
  PayPalOneTimePaymentButton,
  usePayPal,
  INSTANCE_LOADING_STATE
} from "@paypal/react-paypal-js/sdk-v6"

function PagoPaypal({ idReserva }) {

  const {
    loadingStatus,
    error
  } = usePayPal()


  async function crearOrden() {
    console.log("ID RESERVA:", idReserva)

    const respuesta = await fetch(
      "http://localhost:3000/paypal/crear-orden",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idReserva
        })
      }
    )

    const datos = await respuesta.json()

    console.log("RESPUESTA CREAR ORDEN:", datos)

    if (!respuesta.ok) {
      throw new Error(
        datos.mensaje || "No se pudo crear la orden."
      )
    }

    return {
      orderId: datos.id
    }
  }


  async function aprobarPago({ orderId }) {
    console.log("ORDER ID:", orderId)

    const respuesta = await fetch(
      `http://localhost:3000/paypal/capturar-orden/${orderId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idReserva
        })
      }
    )

    const datos = await respuesta.json()

    console.log("RESPUESTA CAPTURA:", datos)

    if (!respuesta.ok) {
      throw new Error(
        datos.mensaje ||
        "No se pudo capturar el pago."
      )
    }

    alert("Pago realizado correctamente.")
  }


  if (loadingStatus === INSTANCE_LOADING_STATE.PENDING) {
    return (
      <p>
        Cargando PayPal...
      </p>
    )
  }


  if (loadingStatus === INSTANCE_LOADING_STATE.REJECTED) {
    return (
      <p>
        Error al cargar PayPal:
        {" "}
        {error?.message || "Error desconocido"}
      </p>
    )
  }


  return (
    <PayPalOneTimePaymentButton
      createOrder={crearOrden}

      onApprove={aprobarPago}

      onCancel={(data) => {
        console.log("Pago cancelado:", data)
      }}

      onError={(error) => {
        console.error("ERROR PAYPAL:", error)
      }}

      onComplete={(data) => {
        console.log("PAYPAL COMPLETADO:", data)
      }}
    />
  )
}

export default PagoPaypal