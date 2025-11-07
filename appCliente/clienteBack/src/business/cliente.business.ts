import { InicioSesionDto, Login, TokenDto, Usuario } from "../dtos/cliente.dto";
import { obtenerPorCorreo, Cliente } from "../repositorios/cliente.repositorio";
import bcrypt from "bcrypt";

export async function iniciarSesion(
  inicioSesion: InicioSesionDto
): Promise<Login | undefined> {
  const cliente = await obtenerPorCorreo(inicioSesion.correo);
  if (cliente == undefined) {
    return undefined;
  }

  if (!(await esValida(cliente.contraseña, inicioSesion.contraseña))) {
    return undefined;
  }

  const usuario: Usuario = {
    id: cliente.id,
    nombres: cliente.nombres,
  };
  
  // devolver token
  const tokenDto: TokenDto = {
    token: crearToken(cliente),
    fecha: new Date(),
  };
  const login = { token: tokenDto, usuario: usuario };
  return login;
}

function esValida(
  contraseñaCliente: string | undefined,
  contraseñaInicio: string
): Promise<boolean> {
  if (!contraseñaCliente) {
    throw new Error("La contraseña no esta definida");
  }
  return bcrypt.compare(contraseñaInicio, contraseñaCliente);
}

function crearToken(cliente: Cliente | null): string {
  return "hola aqui el Token";
}

export function hashearContra(contraseña: string): Promise<string> {
  const salt = 10;
  return bcrypt.hash(contraseña, salt);
}
