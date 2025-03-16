import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
import router from "./routers/booksRouter";
import connectDb from "./config/db";
import errorHandler from "./middleware/errorHandler";
// connect database
connectDb();

const app: Application = express();

// Body Parser
app.use(express.json());

// Load custom file
const result = dotenv.config();
if (result.error) {
  console.log("Error loading .env file", result.error);
}

const PORT = process.env.PORT;

// Mount the route

app.use("/api/v1/books", router);

// Error Handling Middleware (Must be placed after routes)

app.use(errorHandler);

// Routes

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello  family");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
