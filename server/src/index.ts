import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend fungerer!" });
});

app.listen(PORT, () => {
  console.log(`Server kjører på http://localhost:${PORT}`);
});