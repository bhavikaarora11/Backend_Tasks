const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let products = [
    { name: "Toys", price: 19.99 },
    { name: "SoftToys", price: 29.99 },
    { name: "HandBag", price: 39.99 },
    { name: "Bottles", price: 49.99 },
];

// GET / - Display product list with optional search filtering
app.get('/', (req, res) => {
    const searchQuery = req.query.search;
    let filteredProducts = products;

    // Filter products if a search query is provided
    if (searchQuery) {
        filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    res.render('product', { products: filteredProducts });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});