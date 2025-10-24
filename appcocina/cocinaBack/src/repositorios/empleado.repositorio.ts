import { EmpleadoVista } from "../dtos/empleado.dto";
import { getDB } from "../lib/mongo";
import { Collection } from "mongodb";

export interface Empleado {
  id: number;
  curp: string;
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: string;
  sexo: string;
  id_estado: number;
  correo: string;
  contraseña: string;
  id_rol: number;
  status: string;
}

export async function siguienteId(): Promise<number> {
  const db = getDB();
  const total = await db.collection("empleado").countDocuments();
  return total + 1;
}

export async function obtenerEmpleados(): Promise<EmpleadoVista[]> {
  const db = getDB();
  const empleadoCollection: Collection<EmpleadoVista> =
    db.collection<EmpleadoVista>("empleado");
  return await empleadoCollection
    .aggregate([
      {
        $match: { status: "activo" },
      },
      {
        $lookup: {
          from: "estado",
          localField: "id_estado",
          foreignField: "id",
          as: "estado",
        },
      },
      {
        $unwind: "$estado",
      },
      {
        $lookup: {
          from: "puesto",
          localField: "id_rol",
          foreignField: "id",
          as: "puesto",
        },
      },
      {
        $unwind: "$puesto",
      },
    ])
    .toArray() as EmpleadoVista[];
}

export async function obtenerPorId(id: number): Promise<Empleado | null> {
  const db = getDB();
  const empleadoCollection: Collection<Empleado> =
    db.collection<Empleado>("empleado");
  return await empleadoCollection.findOne({ id });
}

export async function obtenerPorCorreo(
  correo: string
): Promise<Empleado | null> {
  const db = getDB();
  const empleadoCollection: Collection<Empleado> =
    db.collection<Empleado>("empleado");
  return await empleadoCollection.findOne({ correo: correo });
}

export async function obtenerPorCurp(curp: string): Promise<EmpleadoVista | null> {
  const db = getDB();
  const empleadoCollection: Collection<EmpleadoVista> =
    db.collection<EmpleadoVista>("empleado");
  const resultado = await empleadoCollection
     .aggregate([
       {
         $match: { curp: curp },
       },
       {
         $lookup: {
           from: "estado",
           localField: "id_estado",
           foreignField: "id",
           as: "estado",
         },
       },
       {
         $unwind: "$estado",
       },
       {
         $lookup: {
           from: "puesto",
           localField: "id_rol",
           foreignField: "id",
           as: "puesto",
         },
       },
       {
         $unwind: "$puesto",
       },
     ])
     .toArray() as EmpleadoVista[];
     return resultado[0] ?? null
}

export async function agregarEmpleado(empleado: Empleado): Promise<number> {
  const db = getDB();
  const empleadoCollection: Collection<Empleado> =
    db.collection<Empleado>("empleado");
  await empleadoCollection.insertOne(empleado);
  return empleado.id;
}

export async function actualizarEmpleado(
  curp: string,
  empleado: Empleado
): Promise<number> {
  const db = getDB();
  const empleadoCollection: Collection<Empleado> =
    db.collection<Empleado>("empleado");
  const res = await empleadoCollection.updateOne({ curp }, { $set: empleado });
  return res.modifiedCount;
}

export async function borrarEmpleado(id: number): Promise<number> {
  const db = getDB();
  const empleadoCollection: Collection<Empleado> =
    db.collection<Empleado>("empleado");
  const res = await empleadoCollection.updateOne(
    { id },
    { $set: { status: "inactivo" } }
  );
  return res.modifiedCount;
}
