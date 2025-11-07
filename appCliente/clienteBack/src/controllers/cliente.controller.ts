import { InicioSesionDto } from "../dtos/cliente.dto";
import * as clienteRepositorio from "../repositorios/cliente.repositorio";
import { Request, Response } from "express";
import {
  iniciarSesion as iniciarSesionBusiness,
  hashearContra,
} from "../business/cliente.business";

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
): Promise<Response> => {
  const correo = req.params.correo;
  const cliente = await clienteRepositorio.obtenerPorCorreo(correo);
   return res.status(200).json(cliente);
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
    telefono,
    cp,
    direccion
  } = req.body;

  const verificacion = await clienteRepositorio.obtenerPorCorreo(correo);
  if (verificacion != undefined) {
    res
      .status(208)
      .json({ mensaje: "el correo ya ha sido registrado anteriormente" });
  }
  // verificar correo
  const cliente = {
    id: await clienteRepositorio.obtenerSiguiente(),
    nombres,
    primerApellido,
    segundoApellido,
    fechaNacimiento,
    sexo,
    correo,
    cp: [cp],
    direccion: [direccion],
    telefono,
    contraseña: await hashearContra(contraseña),
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

export const iniciarSesion = async (req: Request, res: Response) => {
  const inicioSesionDto: InicioSesionDto = {
    correo: req.body.correo,
    contraseña: req.body.contraseña,
  };
  const tokenDto = await iniciarSesionBusiness(inicioSesionDto);
  if (tokenDto == undefined) {
    res.status(404).json({
      mensaje: "credenciales invalidas",
    });
  } else {
    res.status(200).json(tokenDto);
  }
};
