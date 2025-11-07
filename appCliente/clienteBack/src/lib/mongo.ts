import { MongoClient, Db } from "mongodb"
import dotenv from "dotenv"
dotenv.config();

if (!process.env.URI) {
    throw new Error("La variable URI no esta definida")
}

const uri: string = process.env.URI;
const client = new MongoClient(uri);

let db: Db | null = null;

export async function connectDB(): Promise<void> {
  try {
    await client.connect();
    db = client.db("cocina");
    console.log("conectado a MongoDB");
  } catch (eror: any) {
    console.error("error al conectar a Mongo", eror.message);
    process.exit(1);
  }
}

export function getDB(): Db {
    if (!db) throw new Error("la base de datos no esta conectada")
    return db;
}