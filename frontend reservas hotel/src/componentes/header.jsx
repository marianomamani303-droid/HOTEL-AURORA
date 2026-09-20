import { useNavigate } from "react-router-dom"

function Header() {
  const navigate = useNavigate()

  return (
    <header className="hero">
      <div className="contenido-header">

        <h2>HOTEL AURORA</h2>

        <h4>Una experiencia para recordar</h4>

        <p>
          Descubrí un espacio creado para disfrutar, descansar
          y vivir cada momento con el máximo confort.
        </p>

        <div className="botones-header">
          <button
            className="boton boton-principal"
            onClick={() => navigate("/habitaciones")}
          >
            Conocer nuestras habitaciones
          </button>
        </div>

      </div>
    </header>
  )
}

export default Header