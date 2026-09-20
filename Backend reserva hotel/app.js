
import "dotenv/config"

import express from "express"
import cors from "cors"


// CONTROLADORES — LOGIN Y REGISTRO

import {
  registrarUsuario,
  loguearUsuario
} from "./controladores/login_y_registro.js"


// CONTROLADORES — HABITACIONES

import {
  crearHabitacion,
  obtenerHabitaciones,
  DeleteHabitacion
} from "./controladores/habitaciones.js"


// CONTROLADORES — HABITACIONES USUARIO

import {
  MHabitacionesUsuario,
  habitaciones_destacadas
} from "./controladores/habitacionesUsuario.js"


// CONTROLADORES — RESERVAS

import {
  guardar_reserva,
  obtener_reservas,
  obtener_pagos
} from "./controladores/reservas.js"


// CONTROLADORES — PAYPAL

import {
  crear_orden,
  capturar_orden
} from "./controladores/paypal.js"

// CONTROLADORES - DASHBOARD INDEX

import {
  obtener_info,
  obtener_reservas_dashboard,
  verificar_admin
} from "./controladores/dashboardIndex.js"

// CONFIGURACIÓN — MULTER

import upload from "./comfig/multerconfig.js"


const app = express()


// MIDDLEWARES

app.use(cors())

app.use(express.json())

app.use(
  express.urlencoded({
    extended: true
  })
)


// USUARIOS — LOGIN Y REGISTRO

app.post(
  "/usuariosRegistro",
  registrarUsuario
)

app.post(
  "/usuariosLogin",
  loguearUsuario
)


// RESERVAS

app.post(
  "/guardarReserva",
  guardar_reserva
)

app.post(
  "/MisReservas",
  obtener_reservas
)

app.post("/InfoDelPago",obtener_pagos)


// DASHBOARD — HABITACIONES

app.post("/verificarAdmin",verificar_admin)

app.get(
  "/ObtenerReservas",
  obtener_reservas_dashboard
)

app.get(
  "/obtener-info",
  obtener_info
)

app.post(
  "/guardarhabitaciones",
  upload.array("imagenes", 10),
  crearHabitacion
)

app.get(
  "/ObtenerHabitaciones",
  obtenerHabitaciones
)

app.delete(
  "/DeleteHabitacion",
  DeleteHabitacion
)


// HABITACIONES — USUARIO

app.get(
  "/MostrarHabitacionesUsuario",
  MHabitacionesUsuario
)

app.get("/HabitacionesDestacadas",habitaciones_destacadas)


// PAYPAL — CREAR ORDEN

app.post(
  "/paypal/crear-orden",
  crear_orden
)


// PAYPAL — CAPTURAR ORDEN

app.post(
  "/paypal/capturar-orden/:orderID",
  capturar_orden
)


// SERVIDOR

app.listen(3000, () => {
  console.log("Servidor funcionando en el puerto 3000")
})

