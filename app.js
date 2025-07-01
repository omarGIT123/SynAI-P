const express = require("express");
const app = express();
const cors = require("cors");
const indexRoutes = require("./routes/index");
const https = require("https");
const fs = require("fs");
const http = require("http");
require("dotenv").config();

// Use NODE_ENV to determine the environment, default to 'development'
const isProduction = process.env.NODE_ENV === "production";

const PORT = process.env.PORT || (isProduction ? 443 : 4000); // Use 443 for prod, 4000 for dev

// --- CORS Configuration ---
const allowedOrigins = [
  "https://omar-bradai-portfolio.onrender.com",
  "https://portfolio.omarbradai.tn",
];

// For local development, add localhost to the allowed origins
if (!isProduction) {
  allowedOrigins.push("http://localhost:8080"); // Add your local frontend port
  allowedOrigins.push("http://localhost:5173"); // Example for Vite/other tools
  allowedOrigins.push("http://127.0.0.1:5500")
}

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg));
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


// --- Global Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --- Routes ---
app.use("/", indexRoutes);


// --- Server Setup ---
if (isProduction) {
  // --- PRODUCTION SERVER (HTTPS + HTTP redirect) ---

  // Check if certificate files exist before starting the server
  const privateKeyPath = "/etc/letsencrypt/live/api.omarbradai.tn/privkey.pem";
  const certificatePath = "/etc/letsencrypt/live/api.omarbradai.tn/fullchain.pem";

  if (fs.existsSync(privateKeyPath) && fs.existsSync(certificatePath)) {
    const options = {
      key: fs.readFileSync(privateKeyPath),
      cert: fs.readFileSync(certificatePath),
    };

    const server = https.createServer(options, app);
    server.timeout = 0; // Consider if you really need no timeout
    server.listen(PORT, () => {
      console.log(`✅ HTTPS server running on port ${PORT}`);
    });

    // HTTP to HTTPS redirection server
    http
      .createServer((req, res) => {
        res.writeHead(301, {
          Location: "https://" + req.headers["host"] + req.url,
        });
        res.end();
      })
      .listen(80, () => {
        console.log("✅ HTTP server running on port 80, redirecting to HTTPS");
      });

  } else {
    console.error("❌ SSL certificates not found. Cannot start production HTTPS server.");
    // Fallback to HTTP for emergency, or exit
    app.listen(process.env.HTTP_PORT || 8080, () => {
        console.log(`⚠️ WARNING: Running on HTTP because certs are missing. Port: ${process.env.HTTP_PORT || 8080}`);
    });
  }

} else {
  // --- DEVELOPMENT SERVER (HTTP) ---
  app.listen(PORT, () => {
    console.log(`🚀 Development server running on http://localhost:${PORT}`);
  });
}