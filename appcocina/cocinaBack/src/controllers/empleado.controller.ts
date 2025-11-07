import * as empleadoRepositorio from "../repositorios/empleado.repositorio";
import {
  iniciarSesion as iniciarSesionBusiness,
  hashearContra,
} from "../business/empleado.business";
import { Request, Response } from "express";
import { InicioSesionDto } from "../dtos/empleado.dto";
import { generarCURP } from "../services/curp";
import { obtenerPorId as estadoId } from "../repositorios/estado.repositorio";

export const obtenerTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const empleados = await empleadoRepositorio.obtenerEmpleados();
  res.status(200).json(empleados);
};

export const obtenerPorId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id: number = parseInt(req.params.id);
  const empleado = await empleadoRepositorio.obtenerPorId(id);
  res.status(200).json(empleado);
};

export const obtenerPorCurp = async (
  req: Request,
  res: Response
): Promise<void> => {
  const curp: string = req.params.curp;
  const empleado = await empleadoRepositorio.obtenerPorCurp(curp);
  res.status(200).json(empleado);
};

export const agregarEmpleado = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  const {
    nombres,
    primerApellido,
    segundoApellido,
    fechaNacimiento,
    sexo,
    id_estado,
    correo,
    contraseña,
    id_rol,
  } = req.body;

  const estado = await estadoId(id_estado);
  if (!estado || !estado.clave) {
    return res.status(400).json({ mensaje: "estado no encontrado" });
  }
  const nombreEstado = estado?.clave;

  const curp = await generarCURP({
    nombres,
    primerApellido,
    segundoApellido,
    fechaDeNacimiento: fechaNacimiento,
    sexo,
    estado: nombreEstado,
  });

  const verificacion = await empleadoRepositorio.obtenerPorCurp(curp);
  if (verificacion != undefined) {
    return res
      .status(208)
      .json({ mensaje: "usuario registrado anteriormente" });
  }

  const empleado = {
    id: await empleadoRepositorio.siguienteId(),
    curp: curp,
    nombres,
    primerApellido,
    segundoApellido,
    fechaNacimiento,
    sexo,
    id_estado,
    correo,
    contraseña: await hashearContra(contraseña),
    id_rol,
    status: "activo",
  };

  const id = await empleadoRepositorio.agregarEmpleado(empleado);
  res.status(201).json({
    id: id,
    encodeKey: "",
    mensaje: "Dato guardado",
  });
};

export const actualizarEmpleado = async (
  req: Request,
  res: Response
): Promise<void> => {
  const curp = req.params.curp;
  const empleado = req.body;
  await empleadoRepositorio.actualizarEmpleado(curp, empleado);
  res.status(200).json({
    id: curp,
    encodeKey: "",
    mensaje: "Dato acutalizado",
  });
};

export const borrarEmpleado = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  await empleadoRepositorio.borrarEmpleado(id);
  res.status(200).json({
    id: id,
    encodeKey: "",
    mensaje: "Dato borrado",
  });
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
