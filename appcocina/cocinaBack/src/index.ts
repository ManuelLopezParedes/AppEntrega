import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./lib/mongo";
import { empleadoRouter } from "./routers/empleado.router";
import { productoRouter } from "./routers/producto.router";
import { categoriaRouter } from "./routers/categoria.router";
import { estadoRouter } from "./routers/estado.router";
import { puestoRouter } from "./routers/puesto.router";

dotenv.config();

const app = express();
if (!process.env.PORT) {
  throw new Error("La variable PORT no esta definida");
}
const PORT: string = process.env.PORT;

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

async function main() {
  await connectDB();
  app.use("/api", empleadoRouter);
  app.use("/api", productoRouter);
  app.use("/api", categoriaRouter);
  app.use("/api", estadoRouter);
  app.use("/api", puestoRouter);

  app.get("/", (req: Request, res: Response) => {
    res.send("Cocina typescript");
  });

  app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Error al iniciar la app:", err);
});

export default app;
