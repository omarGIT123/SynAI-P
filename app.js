const express = require("express");
const app = express();
const cors = require("cors");
const indexRoutes = require("./routes/index");
require("dotenv").config();

const PORT = 3000; // Default to 3000 for localhost development

// Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:3000", // Allow localhost during development
  "https://omar-bradai-portfolio.onrender.com", // Allowed origin for production
  "https://omar-bradai-portfolio.tn", // Allowed origin for production
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is in the allowedOrigins list
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        // Allow the request
        callback(null, true);
      } else {
        // Deny the request
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Routes
app.use("/", indexRoutes);

// Start HTTP server on port 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
