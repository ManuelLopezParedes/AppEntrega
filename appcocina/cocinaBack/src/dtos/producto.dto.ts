import { Producto } from "../repositorios/producto.repositorio";

export interface ProductoVista extends Producto{
    categoria: {
        id_categoria: number,
        categoria: string
    }
}