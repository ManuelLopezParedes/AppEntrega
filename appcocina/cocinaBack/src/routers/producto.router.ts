import * as comidaController from "../controllers/producto.controller";
import express from "express";
export const productoRouter = express.Router();

productoRouter.get("/productos", comidaController.obtenerProductos);
productoRouter.get("/productos/:id", comidaController.obtenerPorId);
productoRouter.get("/productos/categoria/:categoria", comidaController.obtenerPorCategoria)
productoRouter.post("/productos", comidaController.agregarProducto);
productoRouter.put("/productos/:id", comidaController.actualizarProducto);
productoRouter.patch("/productos/:id", comidaController.cambiarEstado);
