export interface InicioSesionDto{
    correo: string;
    contraseña: string;
}

export interface TokenDto{
    token:string;
    fecha: Date;
}

export interface Direccion{
    direccion: string;
    cp:string;
    status:string;
    alias:string;
}

export interface Usuario {
    id: number;
    nombres: string;

}

export interface Login {
    token: TokenDto;
    usuario: Usuario
}