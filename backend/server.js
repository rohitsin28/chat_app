import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import chats from "./data/data.js";
import cors from "cors";
import dbConn from "./config/dbConfig.js";
import helmet from "helmet";
import color from "colors";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors("*"));
app.use(helmet());
app.use(express.json())

app.get("/", (req, res) => {
  return res.send("Hello Rohit Singh");
});

app.get("/api/chat", (req, res) => {
  return res.send(chats);
});

app.listen(PORT, async() => {
  await dbConn();
  console.log(`Server started on http://localhost:${PORT}`.yellow.bold);
});
