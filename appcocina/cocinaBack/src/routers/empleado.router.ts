import * as empleadoController from "../controllers/empleado.controller";
import express from "express";
export const empleadoRouter = express.Router();

empleadoRouter.get("/empleados", empleadoController.obtenerTodos);
empleadoRouter.get("/empleados/:id", empleadoController.obtenerPorId);
empleadoRouter.get("/empleados/curp/:curp", empleadoController.obtenerPorCurp);
empleadoRouter.post("/empleados", empleadoController.agregarEmpleado);
empleadoRouter.post("/empleados/iniciarSesion", empleadoController.iniciarSesion);
empleadoRouter.put("/empleados/:curp", empleadoController.actualizarEmpleado);
empleadoRouter.patch("/empleados/:id", empleadoController.borrarEmpleado);