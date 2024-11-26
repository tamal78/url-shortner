const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./utils/db");
const urlRoutes = require("./routes/urlRoutes");
const rateLimiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");
const { swaggerUi, specs } = require("./utils/swagger");

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(rateLimiter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

connectToDatabase();
app.use("/", urlRoutes);
app.get("/", (req, res) => res.send("URL Shortener API"));
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
