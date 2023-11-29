const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
// Mock database
let items = [{ id: 1, name: 'Item 1'}];

app.use(cors({
  origin: '*',
}));

// GET - Read all items
app.get('/items', (req, res) => {
  return res.status(200).json(items);
});

// POST - Create a new item
app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
    };
    items.push(newItem);
   return res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found.');

  item.name = req.body.name;
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(item => item.id === parseInt(id));
  if (index === -1) return res.status(404).send('Item not found.');

  items.splice(index, 1);
  res.status(204).end();
});

app.listen(8080,() => console.log(`Server running on http://127.0.0.1:${8080}`));