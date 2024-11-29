const express = require("express");
const app = express();
const cors = require("cors");
const indexRoutes = require("./routes/index");
require("dotenv").config();

const PORT = process.env.PORT;

// Middleware global
app.use(express.json()); // Pour traiter les JSON
app.use(express.urlencoded({ extended: true })); // Pour traiter les formulaires
app.use(cors());
// Routes
app.use("/", indexRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`server running on port : ${PORT}`);
});
