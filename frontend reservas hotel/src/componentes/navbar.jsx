import hero from "../assets/menu-flat-color-outline-icon-free-png.webp"
import logo from "../assets/ChatGPT Image 14 ago 2026, 05_33_35 p.m..png"
import Menu from "./SideBarMenu"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import "../css/navegacion.css"

function NavBar() {
  const navigate = useNavigate()

  const [mostrarSideBar, setMostrarSideBar] = useState("no-mostrar")
  const [classboton, setClassboton] = useState("")

  const cerrarSideBar = () => setMostrarSideBar("no-mostrar")

  useEffect(() => {
    const id = localStorage.getItem("id")

    setClassboton(id ? "no-mostrar-boton" : "mostrar")
  }, [])

  return (
    <div className="navegacion-space">
      <nav className="navegacion">

        <div className="img-container" onClick={()=> navigate("/")}>
          <img
            src={logo}
            alt="Logo del hotel"
            className="logo"
          />
        </div>

        <div className="nav-usuario">

          <button
            className={`boton ${classboton}`}
            onClick={() => navigate("/LoginRegistro")}
          >
            Iniciar sesión
          </button>

          <button
            className="boton-menu"
            onClick={() => {
              setMostrarSideBar(
                mostrarSideBar === "mostrar"
                  ? "no-mostrar"
                  : "mostrar"
              )
            }}
          >
            <img
              src={hero}
              alt="Abrir menú"
              className="menu"
            />
          </button>

        </div>

        <Menu
          mostrarSideBar={mostrarSideBar}
          cerrarSideBar={cerrarSideBar}
        />

      </nav>
    </div>
  )
}

export default NavBar