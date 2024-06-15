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
    const { email, username, password, fullname, address, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const customersSql = "INSERT INTO customers (email, name, address, phone) VALUES (?, ?, ?, ?)";
    const customerCredentialsSql = "INSERT INTO customer_credentials (customer_id, username, password) VALUES (?, ?, ?)";

    // Insert into customers table first
    db.query(customersSql, [email, fullname, address, phone], (err, result) => {
        if (err) {
            console.error("Error executing customers query", err);
            return res.status(500).send("Server error");
        }

        // Get the customer ID of the newly inserted customer
        const customerId = result.insertId;

        // Insert into customer_credentials table using the new customer ID
        db.query(customerCredentialsSql, [customerId, username, hashedPassword], (err, result) => {
            if (err) {
                console.error("Error executing customer_credentials query", err);
                return res.status(500).send("Server error");
            }

            res.status(201).json({ message: "User registered successfully" });
        });
    });
});



app.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM customer_credentials WHERE username = ?";
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
        const token = jwt.sign(
            { id: user.customer_id, username: user.username },
            secretKey,
            { expiresIn: "1h" }
        );
        res.status(200).json({
            token,
        });
    });
});
app.get("/orders", async (req, res) => {


    const sql = "SELECT * FROM orders WHERE customer_id = ?";

    db.query(sql, [], (err, result) => {
        if (err) {
            console.error("Error executing query", err);
            return res.status(500).send("Server error");
        }

        res.status(200).json(result);
    });
});
app.post("/payments", async (req, res) => {
    const { user_id, total_amount, status, transaction_id, items, payment } = req.body;

    // Insert order details into the orders table
    const orderSql = `INSERT INTO orders (customer_id, amount, status, date) VALUES (?, ?, ?, NOW())`;

    db.query(orderSql, [user_id, total_amount, status], (orderErr, orderResult) => {
        if (orderErr) {
            console.error("Error inserting order:", orderErr);
            return res.status(500).json({ error: "Server error" });
        }

        const orderId = orderResult.insertId;

        // Insert order items into the order_products table
        const orderItemsSql = `INSERT INTO order_products (order_id, product_id) VALUES ?`;
        const orderItemsValues = items.map(item => [orderId, item.product_id]);

        db.query(orderItemsSql, [orderItemsValues], (orderItemsErr, orderItemsResult) => {
            if (orderItemsErr) {
                console.error("Error inserting order items:", orderItemsErr);
                return res.status(500).json({ error: "Server error" });
            }

            // Insert payment details into the payments table
            const paymentSql = `INSERT INTO payments (order_id, user_id, amount, currency, payment_method, status, transaction_id, payment_details)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

            db.query(paymentSql, [
                orderId,
                user_id,
                total_amount,
                payment.currency,
                payment.payment_method,
                payment.status,
                transaction_id,
                JSON.stringify(payment)
            ], (paymentErr, paymentResult) => {
                if (paymentErr) {
                    console.error("Error inserting payment:", paymentErr);
                    return res.status(500).json({ error: "Server error" });
                }

                res.status(200).json({
                    order_id: orderId,
                    user_id,
                    total_amount,
                    status,
                    transaction_id,
                    items,
                    payment,
                });
            });
        });
    });
});


app.post("/orders", async (req, res) => {
    const { user_id } = req.body;
    console.log("Received user_id:", user_id);
    // c.id AS customer_id,
    // c.name AS customer_name,
    // p.id AS product_id,
    // o.amount AS order_amount,
    // const sql = `
    //     SELECT 
    //         o.id AS order_id,
    //         o.date AS order_date,
    //         o.status AS order_status,
    //         p.name AS product_name,
    //         p.price AS product_price,
    //         p.seller AS product_seller,
    //         p.imageURL AS product_imageURL
    //     FROM 
    //         customers c
    //     JOIN 
    //         orders o ON c.id = o.customer_id
    //     JOIN 
    //         order_products op ON o.id = op.order_id
    //     JOIN 
    //         products p ON op.product_id = p.id
    //     WHERE 
    //         c.id = ?;
    // `;
    const sql = `
    SELECT 
      o.id AS order_id,
      o.date AS order_date,
      o.amount AS order_amount,
      o.status AS order_status,
      p.id AS item_id,
      p.name AS item_name,
      p.price AS item_price
    FROM 
      orders o
    JOIN 
      order_products op ON o.id = op.order_id
    JOIN 
      products p ON op.product_id = p.id
    WHERE 
      o.customer_id = ?;
  `;
    db.query(sql, [user_id], async (err, results) => {
        if (err) {
            console.error("Error executing query", err);
            return res.status(500).send("Server error");
        }
        const groupedOrders = results.reduce((acc, row) => {
            const {
                order_id,
                order_date,
                order_amount,
                order_status,
                item_id,
                item_name,
                item_price
            } = row;

            const order = acc.find(order => order.order_id === order_id);
            if (order) {
                order.items.push({ item_id, item_name, item_price });
            } else {
                acc.push({
                    order_id,
                    order_date,
                    order_amount,
                    order_status,
                    items: [{ item_id, item_name, item_price }]
                });
            }

            return acc;
        }, []);

        res.status(200).json(groupedOrders);
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


app.get("/products", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const productsSql = `
        SELECT 
            p.id AS product_id,
            p.name AS product_name,
            p.description,
            p.price,
            p.seller,
            p.imageURL,
            p.category_id,
            c.name AS category_name,
            COALESCE(AVG(r.rating), 0) AS average_rating
        FROM 
            products p
        LEFT JOIN 
            reviews r ON p.id = r.product_id
            LEFT JOIN 
            categories c ON p.category_id = c.id
        GROUP BY 
            p.id, p.name, p.description, p.price, p.seller, p.imageURL, p.category_id
        LIMIT ? OFFSET ?;
    `;

    const countSql = "SELECT COUNT(*) AS count FROM products";

    db.query(countSql, (countErr, countResults) => {
        if (countErr) {
            console.error("Error counting products", countErr);
            return res.status(500).json({ message: "Server error" });
        }

        const totalItems = countResults[0].count;
        const totalPages = Math.ceil(totalItems / limit);

        db.query(productsSql, [limit, offset], (err, results) => {
            if (err) {
                console.error("Error getting products", err);
                return res.status(500).json({ message: "Server error" });
            }

            res.status(200).json({
                currentPage: page,
                totalPages: totalPages,
                totalItems: totalItems,
                products: results,
            });
        });
    });
});


const port = process.env.BE_PORT || 8000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});
