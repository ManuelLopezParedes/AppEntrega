import * as clienteRepositorio from "../repositorios/cliente.repositorio";
import { Request, Response } from "express";

export const obtenerPorId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const cliente = await clienteRepositorio.obtenerPorId(id);
  res.status(200).json(cliente);
};

export const obtenerPorCorreo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const correo = req.params.correo;
  const cliente = await clienteRepositorio.obtenerPorCorreo(correo);
  res.status(200).json(cliente);
};

export const agregarCliente = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    nombres,
    primerApellido,
    segundoApellido,
    fechaNacimiento,
    sexo,
    correo,
    contraseña,
  } = req.body;
  // verificar correo
  const cliente = {
    id: await clienteRepositorio.obtenerSiguiente(),
    nombres,
    primerApellido,
    segundoApellido,
    fechaNacimiento,
    sexo,
    correo,
    contraseña, // hashear contraseña
    status: "activo",
  };
  await clienteRepositorio.agregarCliente(cliente);
  res.status(201).json({ id: cliente.id, mensaje: "Dato guardado" });
};

export const editarCliente = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const cliente = req.body;
  await clienteRepositorio.editarCliente(id, cliente);
  res.status(200).json({ id: id, mensaje: "Dato actualizado" });
};

export const borrarCliente = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  await clienteRepositorio.borrarCliente(id);
  res.status(200).json({ id: id, mensaje: "Dato eliminado" });
};
