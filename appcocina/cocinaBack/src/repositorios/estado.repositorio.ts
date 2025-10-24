import { Collection } from "mongodb";
import { getDB } from "../lib/mongo";

interface Estado {
  id: number;
  clave: string;
  estado: string;
}

export async function siguienteId(): Promise<number> {
  const db = getDB();
  const total = await db.collection("estado").countDocuments();
  return total + 1;
}

export async function obtenerEstados(): Promise<Estado[]> {
  const db = getDB();
  const estadoCollection: Collection<Estado> = db.collection<Estado>("estado");
  return await estadoCollection.find().toArray();
}

export async function obtenerPorId(id: number): Promise<Estado | null> {
  const db = getDB();
  const estadoCollection: Collection<Estado> = db.collection<Estado>("estado");
  return await estadoCollection.findOne({ id });
}

export async function agregarEstado(estado: Estado): Promise<number> {
  const db = getDB();
  const estadoCollection: Collection<Estado> = db.collection<Estado>("estado");
  await estadoCollection.insertOne(estado);
  return estado.id;
}
