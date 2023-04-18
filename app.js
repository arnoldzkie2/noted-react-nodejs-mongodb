import connectDB from "./src/db/connect.js";
import express from "express";
import { notes } from "./src/routes/noted.js";
import { user } from './src/routes/user.js'
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config()
const app = express();
const MONGO_URI = process.env.MONGO_URI;
//middleware
app.use(cors());
app.use(express.json());
app.use("/api/v1/notes", notes);
app.use('/api/v1/users', user)
app.use(express.static('./public'));

app.all('*', (req,res) => {
  res.json({data: "Page nout found"})
})
const url = 'mongodb+srv://noted:noted123@notedapp.pzcupoj.mongodb.net/NotedApp?retryWrites=true&w=majority'
const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(url);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
