const express = require('express');
const app = express();
const port = 3000;
// Middleware for parsing JSON
app.use(express.json());

let items =[]// empty array to store items

// Create operation 
app.post('/items', ( req, res) => {
    const newItem = {
        id: items.length +1, 
        ...req.body
    };
    items.push(newItem);
    res.status(201).json(newItem);
});
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if(!item) return res.status(404).send('item not found');
    res.json(item);
});

//update operation
app.put ('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if(!item) return res.status(404).send('item not found');
    
    const updateItem = {
        ...item, 
        ...req.body
    };
    items= item.ma(i => p(i.id === parseInt(req.params.id) ? updateItem :i ));
    res.json(updatedItem);

});
//delete operation
app.delete('/items/:id', (req, res) => {
    items = items.filter(i => i.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});




