import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/user.route.js";
import contactRouter from "./routes/contact.route.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactRouter);

connectDB()
  .then(() =>
    app.listen(port, () => console.log(`Server is running on port ${port}`))
  )
  .catch(() => console.log(`Database connection failed, can't start server`));
