export interface InicioSesionDto{
    correo: string;
    contraseña: string;
}

export interface TokenDto{
    token:string;
    fecha: Date;
}