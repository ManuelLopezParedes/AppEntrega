import * as productoRepositorio from "../repositorios/producto.repositorio";
import { Request, Response } from "express";

export const obtenerProductos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const productos = await productoRepositorio.obtenerProductos();
  res.status(200).json(productos);
};

export const obtenerPorId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const producto = await productoRepositorio.obtenerPorId(id);
  res.status(200).json(producto);
};

export const obtenerPorCategoria = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoria = parseInt(req.params.categoria);
  const productos = await productoRepositorio.obtenerPorCategoria(categoria);
  res.status(200).json(productos);
};

// subir producto
