const bcrypt = require("bcryptjs");
const { getDB, connectDB } = require("./database");

async function createAdmin() {

    await connectDB();

    const db = getDB();

    const username = "admin";

    const password = "admin123";

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.run(
        `
        INSERT OR IGNORE INTO admins
        (username, password)
        VALUES (?, ?)
        `,
        [username, hashedPassword]
    );

    console.log("✅ Admin Created");

    process.exit();
}

createAdmin();