const { getDB } = require("../database");

// Save Visitor
const addVisitor = async (req, res) => {

    try {

        const db = getDB();

        const { name, email, phone, profession } = req.body;

        await db.run(
            `
            INSERT INTO visitors
            (name, email, phone, profession)
            VALUES (?, ?, ?, ?)
            `,
            [name, email, phone, profession]
        );

        res.status(201).json({
            message: "Visitor Saved Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Database Error"
        });

    }

};

// Get All Visitors
const getVisitors = async (req, res) => {

    try {

        const db = getDB();

        const visitors = await db.all(`
            SELECT *
            FROM visitors
            ORDER BY created_at DESC
        `);

        res.status(200).json(visitors);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Database Error"
        });

    }

};

module.exports = {
    addVisitor,
    getVisitors
};