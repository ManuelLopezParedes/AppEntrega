import { InicioSesionDto, TokenDto } from "../dtos/empleado.dto";
import {
  obtenerPorCorreo,
  Empleado,
} from "../repositorios/empleado.repositorio";
import bcrypt from "bcrypt";

export async function iniciarSesion(
  inicioSesion: InicioSesionDto
): Promise<TokenDto | undefined> {
  const empleado = await obtenerPorCorreo(inicioSesion.correo);
  if (!empleado?.id_rol) {
    throw new Error("rol no esta asignado");
  }

  if (await esValida(empleado?.contraseña, inicioSesion.contraseña)) {
    // devolver token
    const tokenDto: TokenDto = {
      token: crearToken(empleado),
      fecha: new Date(),
      rol: empleado.id_rol,
    };
    return tokenDto;
  } else {
    return undefined;
  }
}

function esValida(
  contraseñaEmpleado: string | undefined,
  contraseñaInicio: string
): Promise<boolean> {
  if(!contraseñaEmpleado){
    throw new Error("La contraseña no esta definida")
  }
  return bcrypt.compare(contraseñaInicio,contraseñaEmpleado)
}

function crearToken(empleado: Empleado | null): string {
  return "";
}

export function hashearContra(contraseña: string): Promise<string> {
  const salt = 10
  return bcrypt.hash(contraseña,salt)
}
