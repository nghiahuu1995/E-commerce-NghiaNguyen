const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

dotenv.config({ path: "../.env" });
const secretKey = process.env.JWT_SECRET;
const app = express();
app.use(express.json());
app.use(cors());

app.post("/auth/register", async (req, res) => {
    const { email, username, password, securityQuestion, answer } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (email, username, password, security_question, security_answer) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [email, username, hashedPassword, securityQuestion, answer], (err, result) => {
        if (err) {
            console.error("Error executing query", err);
            return res.status(500).send("Server error");
        }
        res.status(201).json({ message: "User registered successfully" });
    });
});

app.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], async (err, result) => {
        if (err) {
            console.error("Error executing query", err);
            return res.status(500).send("Server error");
        }
        if (result.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token });
    });
});

// SQL Injection test
// app.post("/auth/login", async (req, res) => {
//     const { username, password } = req.body;
//     // Vulnerable SQL query
//     const sql = `SELECT * FROM users WHERE username = '${username}'`;

//     db.query(sql, async (err, result) => {
//         if (err) {
//             console.error("Error executing query", err);
//             return res.status(500).send("Server error");
//         }
//         if (result.length === 0) {
//             return res.status(401).json({ error: "Invalid credentials" });
//         }
//         const user = result[0];
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             return res.status(401).json({ error: "Invalid credentials" });
//         }
//         const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
//         res.status(200).json({ token });
//     });
// });



// app.get('/products', async (req, res) => {
//     const sql = "SELECT * FROM products";
//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error getting products');
//             return res.status(500).json({ message: 'Server error' });
//         }
//         if (results.length === 0) {
//             return res.status(404).json({ message: "No products in the table" });
//         }
//         res.status(200).json(results);
//     });
// });
app.get("/products", (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error getting products", err);
            return res.status(500).json({ message: "Server error" });
        }
        // Convert image buffer to base64 string
        const products = results.map(product => ({
            ...product,
            image: product.image ? product.image.toString('base64') : null,
        }));
        res.status(200).json(products);
    });
});



const port = process.env.BE_PORT || 8000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});
