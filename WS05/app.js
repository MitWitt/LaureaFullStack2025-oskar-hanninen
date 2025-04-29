// app.js
// REST API Workshop – Fullstack course

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB yhteys (korvaa omalla yhteysosoitteellasi!)
mongoose.connect('mongodb+srv://myAtlasDBUser:salasana@myatlasclusteredu.nhkq87e.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Task 2: Luo Mongoose schema ja malli
const ItemSchema = new mongoose.Schema({
  title: String,
  artist: String,
  year: Number
});
const Item = mongoose.model('Item', ItemSchema);

// Task 1: REST API -reitit

// GET /api/getall
app.get('/api/getall', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/:id
app.get('/api/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

// POST /api/add
app.post('/api/add', async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// PUT /api/update/:id
app.put('/api/update/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data or ID' });
  }
});

// DELETE /api/delete/:id
app.delete('/api/delete/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

// Task 4: Virheidenkäsittely middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '500 Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
