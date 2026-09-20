import "../css/LoginRegistro.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function RegistrarseYLogin() {
  const [mostrarLogin, setMostrarLogin] = useState(true)

  return (
    <>
      {mostrarLogin ? (
        <Registrarse
          cambiarLogin={() => setMostrarLogin(false)}
        />
      ) : (
        <Login
          cambiarRegistro={() => setMostrarLogin(true)}
        />
      )}
    </>
  )
}

function Registrarse({ cambiarLogin }) {

  const handlesubmit = async (e) => {
    e.preventDefault()

    const datos = new FormData(e.target)

    const nombres = datos.get("nombres")
    const apellidos = datos.get("apellidos")
    const email = datos.get("email")
    const password = datos.get("password")

    try {
      const respuesta = await fetch(
        "http://localhost:3000/usuariosRegistro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nombres,
            apellidos,
            email,
            password
          })
        }
      )

      const resultado = await respuesta.json()

      if (!respuesta.ok) {
        alert(resultado.mensaje)
        return
      }

      alert(resultado.mensaje)

      localStorage.setItem("id", resultado.id)

      cambiarLogin()

    } catch (error) {
      console.error("Error al registrarse:", error)
      alert("Ocurrió un error al registrarse. Intentalo de nuevo.")
    }
  }

  return (
    <form
      className="registro-formulario"
      onSubmit={handlesubmit}
    >

      <h2>Crear una cuenta</h2>

      <div className="registro-campos">

        <div className="registro-campo">
          <label htmlFor="nombres">Nombres</label>

          <input
            id="nombres"
            type="text"
            name="nombres"
            required
          />
        </div>

        <div className="registro-campo">
          <label htmlFor="apellidos">Apellidos</label>

          <input
            id="apellidos"
            type="text"
            name="apellidos"
            required
          />
        </div>

      </div>

      <div className="registro-campo">
        <label htmlFor="registro-email">Email</label>

        <input
          id="registro-email"
          type="email"
          name="email"
          required
        />
      </div>

      <div className="registro-campo">
        <label htmlFor="registro-password">
          Contraseña
        </label>

        <input
          id="registro-password"
          type="password"
          name="password"
          required
        />
      </div>

      <button
        type="submit"
        className="registro-boton"
      >
        Registrarse
      </button>

      <div className="registro-login">
        <span>¿Ya tenés una cuenta?</span>

        <button
          type="button"
          className="registro-login-boton"
          onClick={cambiarLogin}
        >
          Iniciar sesión
        </button>
      </div>

    </form>
  )
}

function Login({ cambiarRegistro }) {

  const navigate = useNavigate()

  const FormCompletado = async (e) => {
    e.preventDefault()

    const datos = new FormData(e.target)

    const email = datos.get("email")
    const password = datos.get("password")

    try {
      const respuesta = await fetch(
        "http://localhost:3000/usuariosLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      )

      const resultado = await respuesta.json()

      if (!respuesta.ok) {
        alert(resultado.mensaje)
        return
      }

      localStorage.setItem("id", resultado.id)
      localStorage.setItem("rol", resultado.rol)

      alert(resultado.mensaje)

      if (resultado.rol === "admin") {
        navigate("/dashboard")
        return
      }

      navigate("/")

    } catch (error) {
      console.error("Error al iniciar sesión:", error)

      alert(
        "Ocurrió un error al iniciar sesión. Intentalo de nuevo."
      )
    }
  }

  return (
    <form
      className="login-formulario"
      onSubmit={FormCompletado}
    >

      <h2>Iniciar sesión</h2>

      <div className="login-campo">
        <label htmlFor="login-email">Email</label>

        <input
          id="login-email"
          type="email"
          name="email"
          required
        />
      </div>

      <div className="login-campo">
        <label htmlFor="login-password">
          Contraseña
        </label>

        <input
          id="login-password"
          type="password"
          name="password"
          required
        />
      </div>

      <button
        type="submit"
        className="login-boton"
      >
        Iniciar sesión
      </button>

      <div className="login-registro">
        <span>¿No tenés una cuenta?</span>

        <button
          type="button"
          className="login-registro-boton"
          onClick={cambiarRegistro}
        >
          Registrarse
        </button>
      </div>

    </form>
  )
}

export default RegistrarseYLogin