import * as clienteController from "../controllers/cliente.controller"
import express from "express"

export const clienteRouter = express.Router()

clienteRouter.get("/clientes/:id", clienteController.obtenerPorId)
clienteRouter.get("/clientes/correo/:correo", clienteController.obtenerPorCorreo)
clienteRouter.get("/clientes/direccion/:id", clienteController.obtenerDireccion)
clienteRouter.post("/clientes", clienteController.agregarCliente)
clienteRouter.post("/clientes/iniciarSesion", clienteController.iniciarSesion)
clienteRouter.put("/clientes/:id", clienteController.editarCliente)
clienteRouter.patch("/clientes/:id", clienteController.borrarCliente)