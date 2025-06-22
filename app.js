const express = require("express");
const app = express();
const cors = require("cors");
const indexRoutes = require("./routes/index");
const https = require("https");
const fs = require("fs");
const http = require("http");
require("dotenv").config();

// --- START OF CHANGES ---

// Use a different port for local development
const PORT = !process.env.isDev
    ? process.env.PORT || 443 
    : 4000; 
// Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Updated CORS for development and production
const allowedOrigins = [
  "https://omar-bradai-portfolio.onrender.com",
  "https://portfolio.omarbradai.tn",
];

// Add localhost to allowed origins for development
if (process.env.NODE_ENV !== 'production') {
    allowedOrigins.push(`http://localhost:3000`); // Assuming your frontend runs on 3000
    allowedOrigins.push(`http://localhost:3001`);
    // Add any other local origins you use
}


app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/", indexRoutes);

// --- Check if we are in production or development ---
if (process.env.NODE_ENV === 'production') {
    // --- PRODUCTION ---
    // These are your original settings for the live server
    console.log("Running in production mode.");

    const options = {
        key: fs.readFileSync("/etc/letsencrypt/live/api.omarbradai.tn/privkey.pem"),
        cert: fs.readFileSync(
            "/etc/letsencrypt/live/api.omarbradai.tn/fullchain.pem"
        ),
    };

    const server = https.createServer(options, app);
    server.timeout = 0;
    server.listen(PORT, () => {
        console.log(`HTTPS server running on port ${PORT}`);
    });

    // HTTP to HTTPS redirect server
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

} else {
    // --- DEVELOPMENT ---
    // These are the settings for running on localhost
    console.log("Running in development mode.");

    http.createServer(app).listen(PORT, () => {
        console.log(`Development server running on http://localhost:${PORT}`);
    });
}