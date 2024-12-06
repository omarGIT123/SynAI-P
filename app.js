const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const cors = require("cors");
const indexRoutes = require("./routes/index");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 443;
const HTTP_PORT = 80;

const sslOptions = {
  key: fs.readFileSync("/etc/letsencrypt/live/api.omarbradai.tn/privkey.pem"),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/api.omarbradai.tn/fullchain.pem"
  ),
};

// CORS allowed origins
const allowedOrigins = [
  "https://portfolio.omarbradai.tn",
  "https://omar-bradai-portfolio.onrender.com",
  "http://localhost",
  "http://localhost:3000",
];

// Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow only the listed origins
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/", indexRoutes);

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`HTTPS server running on port : ${PORT}`);
});

http
  .createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  })
  .listen(HTTP_PORT, () => {
    console.log("HTTP server running on port 80, redirecting to HTTPS");
  });
