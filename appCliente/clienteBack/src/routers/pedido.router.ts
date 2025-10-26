import * as pedidoController from "../controllers/pedido.controller"
import express from "express"

export const pedidoRouter = express.Router();

pedidoRouter.get("/pedidos/:id", pedidoController.obtenerPorId)
pedidoRouter.post("/pedidos", pedidoController.agregarPedido)
pedidoRouter.patch("/pedidos/:id", pedidoController.cambiarEstado)