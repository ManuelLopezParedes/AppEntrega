export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  id_categoria: number;
  imagen: string;
  status: string;
}

export interface ProductoVista extends Producto {
  categoria: {
    id_categoria: number;
    categoria: string;
  };
}

export interface ProductoEnvio {
  id: number;
  nombre: string;
  precio: number;
  comentario: string;


}