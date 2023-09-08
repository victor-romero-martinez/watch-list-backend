import { FilmModel } from "../models/mongoDb/filmsDB.js";
import { validateFilm, validatePartialFilm } from "../schemas/films.schema.js";

export class FilmsController {
  static async create(req, res) {
    const result = validateFilm(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newFilm = await FilmModel.create({ input: result.data });
    res.status(201).json(newFilm);
  }

  static async getAll(req, res) {
    const { genre } = req.query;
    const films = await FilmModel.getAll({ genre });
    res.status(200).json({ count: films.length, data: films });
  }

  static async getById(req, res) {
    const { id } = req.params;
    const film = await FilmModel.getById({ id });
    if (film) return res.status(200).json(film);
    res.status(404).json({ message: "Movie not found" });
  }

  static async update(req, res) {
    const result = validatePartialFilm(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;
    const UpdateFilm = await FilmModel.update({ id, input: result.data });
    if (UpdateFilm === null) {
      return res.status(404).json({ message: "Film not found" });
    }
    res.status(200).json(UpdateFilm);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = await FilmModel.delete({ id });
    if (!result) {
      return res.status(404).json({ message: "Film not found" });
    }
    res.status(200).json({ message: "Film deleted", count: result });
  }
}
