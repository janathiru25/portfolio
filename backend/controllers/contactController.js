const nodemailer = require("nodemailer");
const { getDB } = require("../database");

// Send Contact Message
exports.sendMessage = async (req, res) => {

    const { name, email, subject, message } = req.body;

    try {

        const db = getDB();

        // Save into SQLite
        await db.run(
            `
            INSERT INTO contacts
            (name, email, subject, message)
            VALUES (?, ?, ?, ?)
            `,
            [name, email, subject, message]
        );

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
    }
});

        // Send Email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            replyTo: email,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <h2>New Portfolio Message</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Subject:</strong> ${subject}</p>

                <p><strong>Message:</strong></p>

                <p>${message}</p>
            `
        });

        res.status(200).json({
            message: "Message Saved and Email Sent Successfully"
        });

    } catch (error) {

        console.error("Mail Error:", error);

        res.status(500).json({
            message: "Failed to Save or Send Email"
        });

    }

};

// Get All Messages
exports.getMessages = async (req, res) => {

    try {

        const db = getDB();

        const messages = await db.all(`
            SELECT *
            FROM contacts
            ORDER BY created_at DESC
        `);

        res.status(200).json(messages);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Database Error"
        });

    }

};