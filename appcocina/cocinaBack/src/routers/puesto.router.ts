import * as puestoController from "../controllers/puesto.controller";
import express from "express";
export const puestoRouter = express.Router();

puestoRouter.get("/puestos", puestoController.obtenerPuestos);
puestoRouter.get("/puestos/:id", puestoController.obtenerPorId);
puestoRouter.post("/puestos", puestoController.agregarPuesto);
