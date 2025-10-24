import express, { Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config();

const app = express();
if (!process.env.PORT) {
    throw new Error("La variable PORT no esta definida en .env")
}
const port = process.env.PORT

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

async function main() {
    app.get("/", (req: Request, res: Response) => {
        res.send("App Cliente")
    })

    app.listen(port, () =>{
        console.log(`servidor corriendo en http://${port}`)
    })
}

main().catch((err) =>{
    console.log("Error al iniciar la app:", err)
})