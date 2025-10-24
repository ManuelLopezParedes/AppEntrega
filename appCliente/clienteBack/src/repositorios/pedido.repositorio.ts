import { Collection } from "mongodb";
import { getDB } from "../lib/mongo";

export interface Pedido{
    id: number;
    descripcion: Object;
    total: number;
    status: string;
}

export async function siguienteID(): Promise<number> {
    const db = getDB();
    const total =  await db.collection("pedido").countDocuments();
    return total + 1 
}

export async function obtenerPorId(id: number): Promise<Pedido | null> {
    const db = getDB();
    const pedidoCollection: Collection<Pedido> =  db.collection<Pedido>("pedido");
    return await pedidoCollection.findOne({id}) 
}

export async function agregarPedido(pedido:Pedido): Promise<number> {
    const db = getDB();
    const pedidoCollection:Collection<Pedido> = db.collection<Pedido>("pedido")
    await pedidoCollection.insertOne(pedido)
    return pedido.id
}

export async function cambiarEstado(id:number, estado: string) {
    const db =  getDB();
    const pedidoCollection:Collection<Pedido> = db.collection<Pedido>("pedido")
    await pedidoCollection.updateOne({id},{$set:{status: estado}})    
}