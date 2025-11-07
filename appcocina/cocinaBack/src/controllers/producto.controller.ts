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
  const id: number = parseInt(req.params.id);
  const producto = await productoRepositorio.obtenerPorId(id);
  res.status(200).json(producto);
};

export const obtenerPorCategoria = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoria: number = parseInt(req.params.categoria);
  const productos = await productoRepositorio.obtenerPorCategoria(categoria);
  res.status(200).json(productos);
};

export const agregarProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nombre, descripcion, precio, id_categoria, imagen } = req.body;

  const producto = {
    id: await productoRepositorio.siguienteId(),
    nombre,
    descripcion,
    precio,
    id_categoria,
    imagen: `/imagenes/${imagen}`,
    status: "activo",
  };

  const id = await productoRepositorio.agregarProducto(producto);
  res.status(201).json({
    id: id,
    encodeKey: "",
    mensaje: "Dato guardado",
  });
};

export const actualizarProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const editar = req.body;
  const producto = {
    id: editar.id,
    nombre: editar.nombre,
    descripcion: editar.descripcion,
    precio: editar.precio,
    id_categoria: editar.id_categoria,
    imagen: `/imagenes/${editar.imagen}`,
    status: editar.status,
  };
  await productoRepositorio.actualizarProducto(id, producto);
  res.status(200).json({
    id: id,
    encodeKey: "",
    mensaje: "Dato actualizado",
  });
};

export const cambiarEstado = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const producto = await productoRepositorio.obtenerPorId(id);
  const productoStatus = producto?.status;
  if (productoStatus == "activo") {
    await productoRepositorio.borrarProducto(id);
  } else {
    await productoRepositorio.activarProducto(id);
  }
  res.status(200).json({ mensaje: "estado cambiado" });
};
