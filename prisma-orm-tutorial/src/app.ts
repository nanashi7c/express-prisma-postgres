import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/v1", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://lovalhost:${port}`);
});
