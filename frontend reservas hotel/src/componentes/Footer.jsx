import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer__contenido">

        {/* INFORMACIÓN DEL HOTEL */}
        <div className="footer__columna footer__hotel">

          <h2 className="footer__logo">
            Hotel Aurora
          </h2>

          <p>
            Un espacio pensado para descansar,
            disfrutar y vivir una experiencia
            inolvidable.
          </p>

          <div className="footer__redes">
            <a href="#" aria-label="Instagram">
              Instagram
            </a>

            <a href="#" aria-label="Facebook">
              Facebook
            </a>

            <a href="#" aria-label="WhatsApp">
              WhatsApp
            </a>
          </div>

        </div>


        {/* NAVEGACIÓN */}
        <div className="footer__columna">

          <h3>
            Navegación
          </h3>

          <ul>
            <li>
              <a href="/">Inicio</a>
            </li>

            <li>
              <a href="/habitaciones">
                Habitaciones
              </a>
            </li>

            <li>
              <a href="/servicios">
                Servicios
              </a>
            </li>

            <li>
              <a href="/nosotros">
                Nosotros
              </a>
            </li>

            <li>
              <a href="/contacto">
                Contacto
              </a>
            </li>
          </ul>

        </div>


        {/* CONTACTO */}
        <div className="footer__columna">

          <h3>
            Contacto
          </h3>

          <ul className="footer__contacto">

            <li>
              Av. Principal 123
            </li>

            <li>
              Ciudad, Argentina
            </li>

            <li>
              +54 9 387 123 4567
            </li>

            <li>
              contacto@hotelaurora.com
            </li>

          </ul>

        </div>


        {/* NEWSLETTER */}
        <div className="footer__columna footer__newsletter">

          <h3>
            Recibí nuestras novedades
          </h3>

          <p>
            Suscribite para recibir ofertas,
            novedades y promociones especiales.
          </p>

          <form className="footer__form">

            <input
              type="email"
              placeholder="Tu correo electrónico"
              aria-label="Correo electrónico"
            />

            <button
              type="submit"
              className="boton boton-principal"
            >
              Suscribirme
            </button>

          </form>

        </div>

      </div>


      {/* PARTE INFERIOR */}
      <div className="footer__inferior">

        <p>
          © 2026 Hotel Aurora. Todos los derechos reservados.
        </p>

        <div className="footer__legal">

          <a href="#">
            Política de privacidad
          </a>

          <a href="#">
            Términos y condiciones
          </a>

        </div>

      </div>

    </footer>
  );
}

export default Footer;