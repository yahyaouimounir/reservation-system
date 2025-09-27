const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const path = require("path");
mongoose
  .connect(
    "mongodb+srv://mounir_yy:Mounir2003@mycluster.qyljiqz.mongodb.net/?retryWrites=true&w=majority&appName=mycluster"
  )
  .then(() => console.log("connexion etablie"))
  .catch(() => console.log("connexion a mangodb echoué"));

const app = express();
app.use(express.json());

// api general de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/auth/", userRoutes);

module.exports = app;
