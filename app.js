const express = require("express");
const app = express();
const cors = require("cors");
const indexRoutes = require("./routes/index");
const https = require("https");
const fs = require("fs");
const http = require("http");
require("dotenv").config();

const PORT = process.env.PORT || 443;

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/api.omarbradai.tn/privkey.pem"),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/api.omarbradai.tn/fullchain.pem"
  ),
};

// Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "https://omar-bradai-portfolio.onrender.com",
  "https://portfolio.omarbradai.tn",
];

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

// Routes
app.use("/", indexRoutes);

const server = https.createServer(options, app);
server.timeout = 0;
server.listen(PORT, () => {
  console.log(`HTTPS server running on port ${PORT}`);
});

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
