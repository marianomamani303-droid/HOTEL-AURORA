import FormHabitaciones from "../../componentes/formularioHabitaciones"

function HabitacionesDash(){
  return(
    <>
      <header>
        <h2 style={{
          color: "var(--color-texto)",
          textTransform: "Uppercase",
          textAlign: "center"
        }}>habitaciones</h2>
        <p style={{
          color: "var(--color-texto-secundario)",
          textAlign: "center"
        }}>administra las habitaciones</p>
      </header>
      <main>
        <FormHabitaciones/>
      </main>
    </>
  )
}

export default HabitacionesDash