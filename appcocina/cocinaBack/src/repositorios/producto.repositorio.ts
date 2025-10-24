import { ProductoVista } from "../dtos/producto.dto";
import { getDB } from "../lib/mongo";
import { Collection } from "mongodb";

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  id_categoria: number;
  status: string;
}

export async function siguienteId(): Promise<number> {
  const db = getDB();
  const total = await db.collection("producto").countDocuments();
  return total + 1;
}

export async function obtenerProductos(): Promise<ProductoVista[]> {
  const db = getDB();
  const productoCollection: Collection<ProductoVista> =
    db.collection<ProductoVista>("producto");
  return (await productoCollection
    .aggregate([
      {
        $lookup: {
          from: "categoria",
          localField: "id_categoria",
          foreignField: "id",
          as: "categoria",
        },
      },
      {
        $unwind: "$categoria",
      },
    ])
    .toArray()) as ProductoVista[];
}

export async function obtenerPorId(id: number): Promise<Producto | null> {
  const db = getDB();
  const productoCollection: Collection<Producto> =
    db.collection<Producto>("producto");
  return await productoCollection.findOne({ id });
}

export async function obtenerPorCategoria(
  id_categoria: number
): Promise<Producto[]> {
  const db = getDB();
  const productoCollection: Collection<Producto> =
    db.collection<Producto>("producto");
  return await productoCollection
    .find({ id_categoria: id_categoria })
    .toArray();
}

export async function agregarProducto(producto: Producto): Promise<number> {
  const db = getDB();
  const productoCollection: Collection<Producto> =
    db.collection<Producto>("producto");
  await productoCollection.insertOne(producto);
  return producto.id;
}

export async function actualizarProducto(
  id: number,
  producto: Producto
): Promise<void> {
  const db = getDB();
  const productoCollection: Collection<Producto> =
    db.collection<Producto>("producto");
  await productoCollection.updateOne({ id }, { $set: producto });
}

export async function borrarProducto(id: number): Promise<number> {
  const db = getDB();
  const productoCollection: Collection<Producto> =
    db.collection<Producto>("producto");
  const res = await productoCollection.updateOne(
    { id },
    { $set: { status: "inactivo" } }
  );
  return res.modifiedCount;
}

export async function activarProducto(id: number): Promise<number> {
  const db = getDB();
  const productoCollection: Collection<Producto> =
    db.collection<Producto>("producto");
  const res = await productoCollection.updateOne(
    { id },
    { $set: { status: "activo" } }
  );
  return res.modifiedCount;
}
