import { MongoClient, Db } from "mongodb"

if (!process.env.URI) {
    throw new Error("LA variabl URI no esta definida")
}

const uri: string = process.env.URI;
const cliente = new MongoClient(uri);

let db: Db | null = null;

export async function connectDB(): Promise<void> {
    try {
        await cliente.db("Cocina");
        console.log("Conectado a mongoDB")
    } catch (error: any) {
        console.log("error al conectar a Mongo", error.message);
        process.exit(1);
    }
}

export function getDB(): Db {
    if (!db) throw new Error("la base de datos no esta conectada")
    return db;
}