const express = require("express");
const app = express();
const cors = require("cors");
const indexRoutes = require("./routes/index");
require("dotenv").config();

const PORT = process.env.PORT;

// Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow all origins by using a wildcard
app.use(
  cors({
    origin: "https://omar-bradai-portfolio.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/", indexRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`server running on port : ${PORT}`);
});
