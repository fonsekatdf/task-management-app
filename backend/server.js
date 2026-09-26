const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// connect to database
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
    res.send("Task Management API is running...");
});

app.use("/api/tasks", require("./routes/taskRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});