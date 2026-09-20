import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"

function RutaProtegida({ children }) {
  const [autorizado, setAutorizado] = useState(null)

  useEffect(() => {
    const verificarUsuario = async () => {
      const id = localStorage.getItem("id")

      if (!id) {
        setAutorizado(false)
        return
      }

      try {
        const respuesta = await fetch(
          "http://localhost:3000/verificarAdmin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              idUsuario: id
            })
          }
        )

        const resultado = await respuesta.json()

        console.log("ID del usuario:", id)
        console.log("Respuesta del servidor:", resultado)

        if (!respuesta.ok) {
          setAutorizado(false)
          return
        }

        setAutorizado(resultado.esAdmin === true)

      } catch (error) {
        console.error("Error al verificar administrador:", error)
        setAutorizado(false)
      }
    }

    verificarUsuario()
  }, [])

  if (autorizado === null) {
    return <p>Verificando acceso...</p>
  }

  if (!autorizado) {
    return <Navigate to="/" replace />
  }

  return children
}

export default RutaProtegida