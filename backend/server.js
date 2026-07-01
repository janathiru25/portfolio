const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./database");

const visitorRoutes = require("./routes/visitorRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use("/api/visitor", visitorRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Portfolio Backend Server is Running 🚀");
});

const PORT = process.env.PORT || 5000;

// Start Server AFTER Database Connection
async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("Database Connection Failed:", err);
    }
}

startServer();