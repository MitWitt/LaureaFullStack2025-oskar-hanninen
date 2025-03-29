const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middlewaret
app.use(bodyParser.json());
app.use(express.static("public")); // Palvelee staattisia tiedostoja

// ========== Exercise 1: Basic Routes ==========
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});

app.get("/contact", (req, res) => {
    res.send("Contact Page");
});

app.get("/services", (req, res) => {
    res.send("Services Page");
});

// ========== Exercise 3: Handling POST Requests ==========
app.post("/submit", (req, res) => {
    res.json({ message: "Data received", data: req.body });
});

// ========== Exercise 4: Middleware ==========
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

const customHeaderMiddleware = (req, res, next) => {
    if (!req.headers["x-custom-header"]) {
        return res.status(400).json({ error: "Missing X-Custom-Header" });
    }
    next();
};

app.get("/protected", customHeaderMiddleware, (req, res) => {
    res.send("You accessed a protected route!");
});

// ========== Exercise 5: File Handling ==========
app.get("/list", (req, res) => {
    fs.readFile("data.txt", "utf8", (err, data) => {
        if (err) return res.status(500).send("Error reading file");
        res.send(`<pre>${data}</pre>`);
    });
});

app.get("/json", (req, res) => {
    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) return res.status(500).send("Error reading JSON file");
        const users = JSON.parse(data);
        let table = "<table border='1'><tr><th>Name</th><th>Email</th></tr>";
        users.forEach(user => {
            table += `<tr><td>${user.name}</td><td>${user.email}</td></tr>`;
        });
        table += "</table>";
        res.send(table);
    });
});

app.post("/add", (req, res) => {
    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) return res.status(500).send("Error reading JSON file");
        let users = JSON.parse(data);
        users.push(req.body);
        fs.writeFile("data.json", JSON.stringify(users, null, 2), err => {
            if (err) return res.status(500).send("Error saving data");
            res.send("User added!");
        });
    });
});

// ========== Käynnistä palvelin ==========
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
