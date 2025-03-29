const express = require("express");
const app = express();
const port = 3000;

// Asetetaan EJS-templating käyttöön
app.set("view engine", "ejs");

// Reitti, joka renderöi EJS-templaten
app.get("/", (req, res) => {
    const items = ["Kahvi", "Tee", "Kaakao"];
    const isAdmin = false; // tai true, jos haluat testata admin-tilan
    res.render("index", { message: "Tervetuloa kahvilaan!", items, isAdmin });
});

// Lisää uusi reitti /users
app.get("/users", (req, res) => {
    const users = [
        { name: "Matti Meikäläinen", email: "matti@example.com" },
        { name: "Maija Mallikas", email: "maija@example.com" }
    ];
    res.render("users", { users });
});

app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(r.route.path);  // Tulostaa kaikki reitit konsoliin
    }
});

app.listen(port, () => {
    console.log(`Serveri käynnissä osoitteessa http://localhost:${port}`);
});

