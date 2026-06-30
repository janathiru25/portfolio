const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

let db;

async function connectDB() {

    db = await open({
        filename: "./portfolio.db",
        driver: sqlite3.Database
    });

    console.log("✅ SQLite Connected");

    // Visitor Table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS visitors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            profession TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Contact Table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Projects Table
await db.exec(`
CREATE TABLE IF NOT EXISTS projects (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    title TEXT NOT NULL,

    description TEXT NOT NULL,

    technologies TEXT NOT NULL,

    github TEXT,

    demo TEXT,

    image TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)
`);

        // admins table
    await db.exec(`
CREATE TABLE IF NOT EXISTS admins (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    username TEXT UNIQUE NOT NULL,

    password TEXT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);
`);

    console.log("✅ Tables Ready");
}

function getDB() {
    return db;
}

module.exports = {
    connectDB,
    getDB
};