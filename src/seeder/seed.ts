import * as fs from "fs";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { BookSchema } from "../validators/bookValidator";
import Book from "../models/booksModel";
import { z } from "zod";
import path from "path";

//    load the env variables
const result = dotenv.config();

if (result.error) {
  console.log("Error loading .env file", result.error);
}

// Ensure  MONGO_URI is defined

const mongoURI: string = process.env.MONGO_URI || "";

if (mongoURI) {
  console.error("❌ MONGO_URI is not defined in the .env file.");
  process.exit(1); //Stop execution
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error(`❌ MongoDB connection failed: ${err.message}`);
    process.exit(1);
  });

//   Read JSON  files

const bookFilepath = path.join(__dirname, "_data", "book.json");

const books = JSON.parse(fs.readFileSync(bookFilepath, "utf-8"));

// Validate Data Before Importing
const validateData = <T>(data: unknown[], schema: z.ZodSchema<T>) => {
  const result = data.map((item) => schema.safeParse(item));

  //   Find invalid items
  const invalidItems = result.filter((r) => !r.success);

  //   if there are errors,log them and stop the process
  if (invalidItems.length > 0) {
    console.error("❌ Invalid Data Found:", invalidItems);
    process.exit(1);
  }
};
