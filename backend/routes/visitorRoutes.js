const express = require("express");
const router = express.Router();

const {
    addVisitor,
    getVisitors
} = require("../controllers/visitorController");

// Save Visitor
router.post("/", addVisitor);

// Get All Visitors
router.get("/", getVisitors);

module.exports = router;