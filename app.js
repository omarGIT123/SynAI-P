const express = require("express");
const app = express();
const cors = require("cors");
const indexRoutes = require("./routes/index");
const http = require("http");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "https://omar-bradai-portfolio.onrender.com",
  "https://portfolio.omarbradai.tn",
 
  "https://omarbradai.tn"
];

if (process.env.NODE_ENV !== 'production') {
    allowedOrigins.push(`http://localhost:3000`);
    allowedOrigins.push(`http://localhost:3001`);
}

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
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
const server = http.createServer(app);

server.listen(PORT, () => {
   
    console.log(`HTTP Server starting on port ${PORT}`);
});


