import { getDB } from "../lib/mongo";
import { Collection } from "mongodb";
import { Direccion } from "../dtos/cliente.dto";

export interface Cliente {
  id: number;
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: string;
  sexo: string;
  correo: string;
  contraseña: string;
  telefono: string;
  direccion: Direccion[];
  status: string;
}

export async function obtenerSiguiente(): Promise<number> {
  const db = getDB();
  const total = await db.collection("cliente").countDocuments();
  return total + 1;
}

//eliminar propiedad contraseña
export async function obtenerPorId(id: number): Promise<Cliente | null> {
  const db = getDB();
  const clienteCollection: Collection<Cliente> =
    db.collection<Cliente>("cliente");
  return await clienteCollection.findOne({ id });
}

export async function obtenerPorCorreo(
  correo: string
): Promise<Cliente | null> {
  const db = getDB();
  const clienteCollection: Collection<Cliente> =
    db.collection<Cliente>("cliente");
  return await clienteCollection.findOne({ correo });
}

export async function agregarCliente(cliente: Cliente): Promise<number> {
  const db = getDB();
  const clienteCollection: Collection<Cliente> =
    db.collection<Cliente>("cliente");
  await clienteCollection.insertOne(cliente);
  return cliente.id;
}

export async function editarCliente(
  id: number,
  cliente: Cliente
): Promise<number> {
  const db = getDB();
  const clienteCollection: Collection<Cliente> =
    db.collection<Cliente>("cliente");
  const res = await clienteCollection.updateOne({ id }, { $set: cliente });
  return res.modifiedCount;
}

export async function borrarCliente(id: number): Promise<number> {
  const db = getDB();
  const clienteCollection: Collection<Cliente> =
    db.collection<Cliente>("cliente");
  const res = await clienteCollection.updateOne(
    { id },
    { $set: { status: "inactivo" } }
  );
  return res.modifiedCount;
}

export async function obtenerDireccion(id: number): Promise<Direccion[]> {
  const proyeccion = { _id: 0, direccion: 1 };
  const db = getDB();
  const clienteCollection: Collection<Cliente> =
    db.collection<Cliente>("cliente");
  const res = await clienteCollection.findOne(
    { id: id },
    { projection: proyeccion }
  );
  return res?.direccion ?? [];
}
