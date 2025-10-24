import { getDB } from "../lib/mongo";
import { Collection } from "mongodb";

export interface Cliente {
    id: number;
    nombres: string;
    primerApellido: string;
    segundoApellido: string;
    fechaNacimiento: string;
    sexo: string;
    correo: string;
    contraseña: string;
    // telefono: number;
    status: string;
}

export async function obtenerSiguiente(): Promise<number> {
    const db = getDB();
    const total = await db.collection("empleado").countDocuments();
    return total + 1

}

export async function obtenerPorId(id: NumberConstructor): Promise<Cliente | null> {
    const db = getDB();
    const clienteCollection: Collection<Cliente> = db.collection<Cliente>("cliente");
    return await clienteCollection.findOne({ id })
}

export async function obtenerPorCorreo(correo: string): Promise<Cliente | null> {
    const db = getDB();
    const clienteCollection: Collection<Cliente> = db.collection<Cliente>("cliente");
    return await clienteCollection.findOne({ correo })
}

export async function agregarCliente(cliente: Cliente): Promise<number> {
    const db = getDB();
    const clienteCollection: Collection<Cliente> = db.collection<Cliente>("cliente")
    await clienteCollection.insertOne(cliente)
    return cliente.id
}

export async function editarCliente(id: number, cliente: Cliente): Promise<number> {
    const db = getDB();
    const clienteCollection: Collection<Cliente> = db.collection<Cliente>("cliente")
    const res = await clienteCollection.updateOne({id}, {$set:cliente})
    return res.modifiedCount
}

export async function borrarCliente(id: number): Promise<number>{
    const db = getDB();
    const clienteCollection:Collection<Cliente> = db.collection<Cliente>("cliente")
    const res = await clienteCollection.updateOne({id},{$set: {status:"inactivo"}})
    return res.modifiedCount
}