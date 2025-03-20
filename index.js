require("dotenv").config();
const express = require("express");
const { sequelize, connectDB } = require("./config/database");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

// Custom CORS configuration
app.use(cors({
    origin: 'https://your-frontend.com', // Replace with your actual frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Test Route
app.get("/", (req, res) => {
    res.send("PostgreSQL with Sequelize is working!");
});

// Routes
app.use("/users", userRoute);

// Error Handling Middleware
app.use(errorHandler);

// Sync Database and Start Server
const startServer = async () => {
    try {
        await connectDB();
        await sequelize.sync({ alter: true }); // Use { alter: true } to update tables without losing data
        console.log("Database synchronized!");

        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

startServer();
