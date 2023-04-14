import connectDB from "./db/connect.js";
import express from "express";
import { notes } from "./routes/noted.js";
import cors from "cors";
import MONGO_URI from 'dotenv'
MONGO_URI.config()
const app = express();

//middleware

app.use(cors());
app.use(express.json());

//routes

app.use("/api/v1/notes", notes);

app.all('*', (req,res) => {
  res.json({data: "Page nout found"})
})

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5000, () => {
      console.log("server is listening on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
}

start();
