import { Router } from "express";
import { FilmsController } from "../controllers/films.controllers.js";

export const filmsRouter = Router();

filmsRouter.get("/", FilmsController.getAll);
filmsRouter.post("/", FilmsController.create);

filmsRouter.get("/:id", FilmsController.getById);
filmsRouter.patch("/:id", FilmsController.update);
filmsRouter.delete("/:id", FilmsController.delete);
