import { Empleado } from "../repositorios/empleado.repositorio";

export interface EmpleadoDto {
  id: number;
  nombre: string;
  correo: string;
  contraseña: string;
  fecha_nacimiento: string;
  rol: string;
  status: string;
}

export interface EmpleadoVista extends Empleado {
  estado: {
    id: number;
    nombre: string;
  };
  puesto: {
    id: number;
    nombre: string;
  };
}

export interface InicioSesionDto{
    correo: string;
    contraseña: string;
}

export interface TokenDto{
    token:string;
    fecha: Date;
    rol: number;
}