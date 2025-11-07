import * as categoriaRepositorio from "../repositorios/categoria.repositorio";
import { Request, Response } from "express";

export const obtenerCategorias = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categorias = await categoriaRepositorio.obtenerCategorias();
  res.status(200).json(categorias);
};

export const obtenerPorId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id: number = parseInt(req.params.id);
  const categoria = await categoriaRepositorio.obtenerPorId(id);
  res.status(200).json(categoria);
};