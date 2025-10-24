import * as puestoRepositorio from "../repositorios/puesto.repositorio";
import { Request, Response } from "express";

export const obtenerPuestos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const puestos = await puestoRepositorio.obtenerPuestos();
  res.status(200).json(puestos);
};

export const obtenerPorId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id: number = parseInt(req.params.id);
  const puesto = await puestoRepositorio.obtenerPorId(id);
  res.status(200).json(puesto);
};

export const agregarPuesto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { rol } = req.body;
  const puesto = {
    id: await puestoRepositorio.siguienteId(),
    rol,
  };

  await puestoRepositorio.agregarPuesto(puesto);
  res.status(201).json({mensaje:"Dato registrado"})
};
