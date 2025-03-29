import express from "express";
import chats from "./data/data.js";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  return res.send("Hello Rohit Singh");
});

app.get("/api/chat", (req, res) => {
  return res.send(chats);
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
