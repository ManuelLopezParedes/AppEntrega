import * as estadoRepositorio from "../repositorios/estado.repositorio";
import { Request, Response } from "express";

export const obtenerEstados = async (
  req: Request,
  res: Response
): Promise<void> => {
  const estados = await estadoRepositorio.obtenerEstados();
  res.status(200).json(estados);
};

export const obtenerPorId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const estado = await estadoRepositorio.obtenerPorId(id);
  res.status(200).json(estado);
};

export const agregarEstado = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { clave, estado } = req.body;
  const est = {
    id: await estadoRepositorio.siguienteId(),
    clave,
    estado,
  };

  await estadoRepositorio.agregarEstado(est);
  res.status(201).json({ mensaje: "Estado agregado" });
};
