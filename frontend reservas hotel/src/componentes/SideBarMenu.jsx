import { Link } from "react-router-dom";
import "../css/SideBarMenu.css"



function SideBarMenu({ mostrarSideBar, cerrarSideBar }) {
  
  function cerrarSesion(){
    localStorage.removeItem("id")
    location.reload()
  }

  return (
  <div className={`side-bar ${mostrarSideBar}`}>
  
      <ul className="lista-de-menu">

        <li className="elemento-de-menu">
          <Link to="/" onClick={cerrarSideBar}>
            Inicio
          </Link>
        </li>

        <li className="elemento-de-menu">
          <Link to="/habitaciones" onClick={cerrarSideBar}>
            Habitaciones
          </Link>
        </li>

        <li className="elemento-de-menu">
          <Link to="/MiReservas" onClick={cerrarSideBar}>
            Mis reservas
          </Link>
        </li>

        <li className="elemento-de-menu">
          <Link to="/Pagos" onClick={cerrarSideBar}>
            Pagos
          </Link>
        </li>

        <li className="elemento-de-menu">
          <Link to="/perfil">
            Mi perfil
          </Link>
        </li>

        <li className="cerrar-sesion">
          <button className="boton-contorno" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </li>

      </ul>
    </div>
  );
}
export default SideBarMenu;
