import express, { json } from "express";
import cors from "cors";
import { scoresRouter } from "./routes/scores";

const app = express();

// Middleware para parsear el body de las peticiones
app.use(json());
app.use(cors());

// Deshabilitar la cabecera X-Powered-By para ocultar la tecnología que usamos
app.disable("x-powered-by");

app.use((req, res) => {
  res.status(404).send("Página no encontrada");
});

app.use("/scores", scoresRouter);

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
