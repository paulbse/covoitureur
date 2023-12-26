require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");


const morgan = require("morgan");
const app = express();
const http = require("http").createServer(app);
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Define a simple root route
app.get("/", (req, res) => {
  console.log("Hello from the frontend!");
  res.json({
    message: "Hello from the backend!",
  });
});

// Route middlewares
app.use("/api", authRoutes);

// Other routes
app.get("/signup", (req, res) => {
  res.json({ 
  });
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  res.json({
    message: "test ok",
  });
});

app.listen(8000, () => console.log("Server running on port 8000"));
