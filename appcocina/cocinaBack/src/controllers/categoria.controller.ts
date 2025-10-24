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

export const agregarCategoria = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { categoria } = req.body;

  const cat = {
    id: await categoriaRepositorio.siguienteId(),
    categoria,
    status: "activo",
  };
  await categoriaRepositorio.agregarCategoria(cat);
  res.status(201).json({
    mensaje: "Dato registrado",
  });
};

export const borrarCategoria = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  await categoriaRepositorio.borrarCategoria(id);
  res.status(200).json({ mensaje: "Dato borrado" });
};
