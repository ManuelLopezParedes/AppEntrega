import * as productoController from "../controllers/producto.controller";
import express from "express";
export const productoRouter = express.Router();

productoRouter.get("/productos", productoController.obtenerProductos);
productoRouter.get("/productos/:id", productoController.obtenerPorId);
productoRouter.get("/productos/categoria/:categoria", productoController.obtenerPorCategoria)
productoRouter.post("/productos", productoController.agregarProducto);
productoRouter.put("/productos/:id", productoController.actualizarProducto);
productoRouter.patch("/productos/:id", productoController.cambiarEstado);
