const express = require("express");
const app = express();
const cors = require("cors");
const indexRoutes = require("./routes/index");
const https = require("https");
const fs = require("fs");
const http = require("http");
require("dotenv").config();

const PORT = process.env.PORT || 443; // Set port from .env or fallback to 443 for HTTPS

const options = {
  cert: fs.readFileSync("../server.crt"), // Replace with actual path
  key: fs.readFileSync("../server.key"), // Replace with actual path
};

// Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "https://omar-bradai-portfolio.onrender.com", // First allowed origin (no trailing slash)
  "https://omar-bradai-portfolio.tn", // Second allowed origin (no trailing slash)
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

// Start HTTPS server on port 443
const server = https.createServer(sslOptions, app);
server.timeout = 0; // Disable timeout
server.listen(PORT, () => {
  console.log(`HTTPS server running on port ${PORT}`);
});

// Optional: Redirect HTTP traffic to HTTPS
http
  .createServer((req, res) => {
    res.writeHead(301, {
      Location: "https://" + req.headers["host"] + req.url,
    });
    res.end();
  })
  .listen(80, () => {
    console.log("HTTP server running on port 80, redirecting to HTTPS");
  });
