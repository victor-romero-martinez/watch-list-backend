import cors from "cors";

const ACCEPT_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:5555",
  "http://localhost:3000",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPT_ORIGINS }) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by cors"));
    },
  });
