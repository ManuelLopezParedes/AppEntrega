import * as estadoController from "../controllers/estado.controller";
import express from "express";
export const estadoRouter = express.Router();

estadoRouter.get("/estados", estadoController.obtenerEstados);
estadoRouter.get("/estados/:id", estadoController.obtenerEstados);
estadoRouter.post("/estados", estadoController.agregarEstado);
