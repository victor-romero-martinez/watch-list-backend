import z from "zod";

const genreList = [
  "action",
  "anime",
  "comedy",
  "drama",
  "romance",
  "fantasy",
  "sci-fi",
  "horror",
  "documentary",
  "musical",
];

const filmSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Titulo debe ser string",
      required_error: "Titulo es requerido",
    })
    .trim(),
  year: z.number().int().min(1900).max(2024),
  director: z.string().default("Anonimous"),
  duration: z
    .number({
      invalid_type_error: "Duraciion debe ser number",
      required_error: "Duration es requerido",
    })
    .int()
    .positive(),
  rate: z.number().min(0).max(10).default(0),
  poster: z.string().url({
    message: "Poster url debe ser valido",
  }),
  plot: z
    .string({
      invalid_type_error: "Trama debe ser del tpo string",
      required_error: "Plot es requerido",
    })
    .max(240, { message: "La longitud máxima permitida es de 240 caracteres" })
    .trim(),
  genre: z.array(z.enum(genreList), {
    required_error: "El genero es requerido",
    invalid_type_error: `El genero debe ser alguna de las siguintes [${genreList}]`,
  }),
  trailer: z.string().url({ message: "Debe ser un url valido" }),
});

// for create
export function validateFilm(input) {
  return filmSchema.safeParse(input);
}

// for update
export function validatePartialFilm(input) {
  return filmSchema.partial().safeParse(input);
}
