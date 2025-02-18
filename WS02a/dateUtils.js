function getCurrentDate() {
    return new Date().toLocaleDateString();
}

function formatDate(date) {
    return date.toISOString().split("T")[0]; // Palauttaa YYYY-MM-DD -muodossa
}

module.exports = { getCurrentDate, formatDate };
