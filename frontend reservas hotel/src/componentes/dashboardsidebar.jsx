import { Link } from "react-router-dom"
import { useState } from "react"

import logo from "../assets/ChatGPT Image 14 ago 2026, 05_33_35 p.m..png"
import Menu from "../assets/menu-flat-color-outline-icon-free-png.webp"

import "../css/sidebardash.css"

function SideBarDash() {
  const [presionar, setPresionar] = useState("ocultar")

  const cambiarSidebar = () => {
    setPresionar(
      presionar === "ocultar"
        ? "noocultar"
        : "ocultar"
    )
  }

  function cerrarSesion(){
    localStorage.removeItem("id")
    location.reload()
  }

  return (
    <>
      <button
        className="boton-menu-dash"
        onClick={cambiarSidebar}
      >
        <img
          src={Menu}
          alt="Abrir menú"
        />
      </button>

      <aside className={`Side-Bar-Dash ${presionar}`}>

        <div className="sidebar-dash-header">
          <img
            src={logo}
            alt="Logo del hotel"
          />

          <h3>Admin</h3>
        </div>

        <nav className="sidebar-dash-nav">

          <Link
            className="sidebar-dash-link"
            to="/Dashboard"
          >
            Inicio
          </Link>

          <Link
            className="sidebar-dash-link"
            to="/Dashboard/todas-las-habitaciones"
          >
            Todas las habitaciones
          </Link>

          <Link
            className="sidebar-dash-link"
            to="/Dashboard/Reservas"
          >
            Reservas
          </Link>

          <Link
            className="sidebar-dash-link"
            to="/Dashboard/Habitaciones"
          >
            Agregar habitaciones
          </Link>

        </nav>

        <button className="boton-cerrar-sesion" onClick={cerrarSesion}>
          Cerrar sesión
        </button>

      </aside>
    </>
  )
}

export default SideBarDash