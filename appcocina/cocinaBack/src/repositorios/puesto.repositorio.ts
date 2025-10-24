import { getDB } from "../lib/mongo";
import { Collection } from "mongodb";

interface Puesto {
  id: number;
  rol: string;
}

export async function siguienteId(): Promise<number> {
  const db = getDB();
  const total = await db.collection("puesto").countDocuments();
  return total + 1;
}

export async function obtenerPuestos(): Promise<Puesto[]> {
  const db = getDB();
  const puestoCollection: Collection<Puesto> = db.collection<Puesto>("puesto");
  return await puestoCollection.find().toArray();
}

export async function obtenerPorId(id: number) {
  const db = getDB();
  const puestoCollection: Collection<Puesto> = db.collection<Puesto>("puesto");
  return await puestoCollection.findOne({ id });
}

export async function agregarPuesto(puesto: Puesto): Promise<number> {
  const db = getDB();
  const puestoCollection: Collection<Puesto> = db.collection<Puesto>("puesto");
  await puestoCollection.insertOne(puesto);
  return puesto.id;
}
