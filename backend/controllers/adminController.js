const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getDB } = require("../database");

exports.login = async (req, res) => {

    const { username, password } = req.body;

    try {

        const db = getDB();

        const admin = await db.get(
            "SELECT * FROM admins WHERE username = ?",
            [username]
        );

        if (!admin) {
            return res.status(401).json({
                message: "Invalid Username"
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(

            {
                id: admin.id,
                username: admin.username
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        res.status(200).json({

            message: "Login Successful",

            token

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};
