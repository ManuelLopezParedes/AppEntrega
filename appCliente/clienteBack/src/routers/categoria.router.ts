import * as categoriaController from "../controllers/categoria.controller";
import express from "express";
export const categoriaRouter = express.Router();

categoriaRouter.get("/categorias", categoriaController.obtenerCategorias);
categoriaRouter.get("/categorias/:id", categoriaController.obtenerPorId);
