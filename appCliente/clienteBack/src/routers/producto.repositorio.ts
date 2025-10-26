import * as productoController from "../controllers/producto.controller"
import express from "express"

export const productoRouter = express.Router()

productoRouter.get("/productos", productoController.obtenerProductos);
productoRouter.get("/productos/:id", productoController.obtenerPorId)
productoRouter.get("/prodcutos/categoria/categoria", productoController.obtenerPorCategoria)