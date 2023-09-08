import express, { json } from "express";
import { filmsRouter } from "./routes/films.routes.js";
import { corsMiddleware } from "./middleware/cors.js";

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");

app.use("/films", filmsRouter);

const PORT = process.env.PORT ?? 5555;

app.listen(PORT, () => {
  console.log(`Sever listener in http://localhost:${PORT}`);
});
