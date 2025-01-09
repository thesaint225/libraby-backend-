import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error(
        "The MONGO_URI environment variable is missing or not defined in the .env file. Please verify your .env file to ensure the correct configuration "
      );
    }
    // Initial connection
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully ");

    // handle error after the initial connection
    mongoose.connection.on("error", (error) => {
      console.error("Error after initial connection", error.message);
    });

    // handle disconnection
    mongoose.connection.on("discount", () => {
      console.error("MongoDb discounted.Attempting to reconnect...");
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB:", error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
    process.exit(1); // Exit the process if the database connection fails
  }
};

export default connectDb;
