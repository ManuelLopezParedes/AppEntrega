import { getDB } from "../lib/mongo";
import { Collection } from "mongodb";

interface Categoria {
    id: number;
    categoria: string;
    status: string;
}

export async function siguienteId(): Promise<number> {
    const db = getDB();
    const total = await db.collection("categoria").countDocuments();
    return total + 1;
}

export async function obtenerCategorias(): Promise<Categoria[]>{
    const db = getDB();
    const categoriaCollection: Collection<Categoria> = db.collection<Categoria>("categoria");
    return await categoriaCollection.find({status: "activo"}).sort(["categoria",1]).toArray();
}

export async function obtenerPorId(id: number): Promise<Categoria | null>{
    const db = getDB();
    const categoriaCollection: Collection<Categoria> = db.collection<Categoria>("categoria");
    return await categoriaCollection.findOne({id})
}

export async function agregarCategoria(categoria:Categoria): Promise<number>{
    const db = getDB();
    const empleadoCollection: Collection<Categoria> = db.collection<Categoria>("categoria");
    await empleadoCollection.insertOne(categoria)
    return categoria.id
}

export async function borrarCategoria(id:number): Promise<number>{
    const db = getDB();
    const categoriaCollection: Collection<Categoria> = db.collection<Categoria>("categoria")
    const res = await categoriaCollection.updateOne({id},{$set:{status: "inactivo"}})
    return res.modifiedCount;
}