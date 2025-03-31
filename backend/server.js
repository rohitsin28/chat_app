import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dbConn from "./config/dbConfig.js";
import helmet from "helmet";
import color from "colors";
import globalRoute from "./routes/index.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(helmet());
app.use(express.json())

app.use("/api/v1",globalRoute)

app.listen(PORT, async() => {
  await dbConn();
  console.log(`Server started on http://localhost:${PORT}`.yellow.bold);
});
