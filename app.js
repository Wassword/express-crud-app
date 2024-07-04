const express = require('express');
const app = express();


// Middleware for parsing JSON
app.use(express.json());

let items =[];// empty array to store items

// Create operation 
app.post('/items', ( req, res) => {
    const newItem = {
        id: items.length +1, 
        ...req.body
    };
    items.push(newItem);
    res.status(201).json(newItem);
});
app.get('/items', (req, res) => {
    res.json(items);
});

//update operation
app.put ('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if(!item) return res.status(404).send('Item not found');
    res.json(item);
});
// Update Operation
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');

    const updatedItem = {
        ...item,
        ...req.body
    };

    items = items.map(i => (i.id === parseInt(req.params.id) ? updatedItem : i));
    res.json(updatedItem);
});

// Delete Operation
app.delete('/items/:id', (req, res) => {
    items = items.filter(i => i.id !== parseInt(req.params.id));
    res.status(204).send();
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
