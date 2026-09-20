import mysql from "mysql2/promise"
import connection from "../comfig/config.js"
import bcrypt from 'bcrypt';

const registrarUsuario = async (req, res) => {
    const { nombres, apellidos, email, password } = req.body;

    try {
        const [usuario] = await connection.execute(
            "SELECT * FROM usuario WHERE email = ?",
            [email]
        )

        if (usuario.length > 0) {
            return res.status(409).json({
                mensaje: "El usuario ya está registrado"
            })
        }

        // Generamos el hash de la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [fila] = await connection.execute(
            "INSERT INTO usuario (nombres, apellidos, email, contraseña) VALUES (?, ?, ?, ?)",
            [nombres, apellidos, email, hashedPassword]
        )

        return res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            id: fila.insertId
        })

    } catch (error) {
        console.error("Error al registrar usuario:", error)

        return res.status(500).json({
            mensaje: "Error interno del servidor"
        })
    }
};



const loguearUsuario = async (req, res) => {
    const { email, password } = req.body

    try {
        const [usuario] = await connection.execute(
            "SELECT * FROM usuario WHERE email = ?",
            [email]
        )

        if (usuario.length === 0) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            })
        }

        const coincidencia = await bcrypt.compare(password, usuario[0].contraseña)

        if (!coincidencia) {
            return res.status(401).json({
                mensaje: "Contraseña incorrecta, inténtelo de nuevo."
            })
        }

        return res.json({
            mensaje: "Has iniciado sesión exitosamente.",
            id: usuario[0].id,
            rol:usuario[0].rol
        })

    } catch (error) {
        console.error("Error al iniciar sesión:", error)

        return res.status(500).json({
            mensaje: "Error interno del servidor"
        })
    }
}




export {registrarUsuario,loguearUsuario}