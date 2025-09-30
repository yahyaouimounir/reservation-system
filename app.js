const express = require("express");
const mongoose = require("mongoose");
const ressouceRoutes = require("./routes/ressource");
const userRoutes = require("./routes/user");
const path = require("path");
mongoose
  .connect(
    "mongodb+srv://yahyaoui:mounir2003@cluster0.3prtddp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
app.use("/api/ressources/", ressouceRoutes);
module.exports = app;
