const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/plain");

    if (req.url === "/") {
        res.end("Hello, World!");
    } else if (req.url === "/about") {
        res.end("About Page");
    } else if (req.url === "/contact") {
        res.end("Contact Page");
    } else {
        res.statusCode = 404;
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server is running at http://localhost:3000/");
});
