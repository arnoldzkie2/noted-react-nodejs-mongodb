import connectDB from "./src/db/connect.js";
import express from "express";
import { notes } from "./src/routes/noted.js";
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config()
const app = express();
const MONGO_URI = process.env.MONGO_URI;

//middleware

app.use(cors());
app.use(express.json());
app.use("/api/v1/notes", notes);
app.use(express.static('./public'));

app.all('*', (req,res) => {
  res.json({data: "Page nout found"})
})

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
