const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
require("dotenv").config();
require("./config/db");
const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.29.27:5173",
  "https://ticklist.onrender.com",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // Include other HTTP methods as needed
    allowedHeaders: ["Content-Type", "Authorization", "x-rtb-fingerprint-id"], // Add your custom header here
    credentials: true,
  })
);
app.use("/api/payment", require("./routes/payment"));
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/quiz", require("./routes/quizRoute"));

app.listen(5000, () => {
  console.log("server listening on port 5000!");
});
