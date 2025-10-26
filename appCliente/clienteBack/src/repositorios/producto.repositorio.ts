import { Collection } from "mongodb";
import { getDB } from "../lib/mongo";
import {Producto, ProductoVista} from "../dtos/producto.dto"

export async function obtenerProductos(): Promise<ProductoVista[]> {
  const db = getDB();
  const productoCollection: Collection<ProductoVista> =
    db.collection<ProductoVista>("producto");
  return (await productoCollection
    .aggregate([
      {
        $match: { status: "activo" },
      },
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
