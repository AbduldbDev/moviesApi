const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");

const app = express();
require("dotenv").config();

mongoose.connect(process.env.MONGODB_STRING);
let db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => console.log("We're connected to the cloud database"));

const corsOptions = {
  origin: ["http://localhost:5173", "https://deborja-movies.vercel.app"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);

if (require.main === module) {
  app.listen(process.env.PORT, () =>
    console.log(`API is now runningg on port ${process.env.PORT}`),
  );
}
module.exports = { app, mongoose };
