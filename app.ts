import cors from "cors";
import { config } from "dotenv";
import express from "express";
import connectDB from "./src/config/db";
import bookRouter from "./src/routes/bookRoutes";
import userRouter from "./src/routes/userRoutes";

config();
connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/books", async (req, res) => {
  res.send("Hello");
});

app.use("/books", bookRouter);
app.use("/users", userRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
