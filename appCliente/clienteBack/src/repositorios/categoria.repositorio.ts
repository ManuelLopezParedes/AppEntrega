import { getDB } from "../lib/mongo";
import { Collection } from "mongodb";

interface Categoria {
    id: number;
    categoria: string;
    status: string;
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
