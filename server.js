const connectDB = require("./config/db");

const express = require("express");

const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads")); 

connectDB();

app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


