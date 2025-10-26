import * as pedidoRepositorio from "../repositorios/pedido.repositorio";
import { Request, Response } from "express";

export const obtenerPorId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const pedido = await pedidoRepositorio.obtenerPorId(id);
  res.status(200).json(pedido);
};

export const agregarPedido = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { descripcion, total, direccion } = req.body;

  const pedido = {
    id: await pedidoRepositorio.siguienteID(),
    descripcion,
    total,
    direccion,
    status: "pendiente",
  };

  await pedidoRepositorio.agregarPedido(pedido);
  res.status(200).json({ id: pedido.id, mensaje: "dato agregado" });
};

export const cambiarEstado = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const estado = req.body;

  await pedidoRepositorio.cambiarEstado(id, estado);
  res.status(200).json({ id: id, mensaje: "dato actualizado" });
};
