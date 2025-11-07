import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/mongo";
import { clienteRouter } from "./routers/cliente.router";
import { productoRouter } from "./routers/producto.router";
import { categoriaRouter } from "./routers/categoria.router";

dotenv.config();

const app = express();
if (!process.env.PORT) {
  throw new Error("La variable PORT no esta definida en .env");
}
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

async function main() {
  await connectDB();
  app.use("/api", clienteRouter);
  app.use("/api", productoRouter);
  app.use("/api", categoriaRouter);

  app.get("/", (req: Request, res: Response) => {
    res.send("App Cliente");
  });

  app.listen(port, () => {
    console.log(`servidor corriendo en http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.log("Error al iniciar la app:", err);
});
