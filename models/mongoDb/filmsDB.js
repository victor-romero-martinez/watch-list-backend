import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { config } from "dotenv";

config();

const DB_URL = process.env.MONGODB_URL;

const client = new MongoClient(DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  try {
    await client.connect();
    const database = client.db("database");
    return database.collection("films");
  } catch (error) {
    console.log("Error connect to database", error);
    await client.close();
  }
}

export class FilmModel {
  static async create({ input }) {
    const db = await connect();
    const timestamp = new Date();
    input["createAt"] = timestamp;
    input["updateAt"] = timestamp;
    const { insertedId } = await db.insertOne(input);
    return {
      id: insertedId,
      ...input,
    };
  }

  static async getAll({ genre }) {
    const db = await connect();
    if (genre) {
      return db
        .find({
          genre: {
            $elemMatch: {
              $regex: genre,
              $options: "i",
            },
          },
        })
        .toArray();
    }
    return db.find({}).toArray();
  }

  static async getById({ id }) {
    const db = await connect();
    const objectId = new ObjectId(id);
    return db.findOne({ _id: objectId });
  }

  static async update({ id, input }) {
    const db = await connect();
    const objectId = new ObjectId(id);
    const timestamp = new Date();
    input["updateAt"] = timestamp;
    const res = await db.findOneAndUpdate(
      { _id: objectId },
      { $set: input },
      { returnDocument: "after" }
    );
    return res;
  }

  static async delete({ id }) {
    const db = await connect();
    const objectId = new ObjectId(id);
    const { deletedCount } = await db.deleteOne({ _id: objectId });
    return deletedCount;
  }
}
