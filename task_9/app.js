const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files (for images, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Product data (hardcoded for now)
const products = [
    { name: 'Product 1', description: 'Description for product 1', image: '/images/product1.jpeg' },
    { name: 'Product 2', description: 'Description for product 2', image: '/images/product2.jpeg' },
    { name: 'Product 3', description: 'Description for product 3', image: '/images/product3.jpeg' }
];

// Route to display the product catalog
app.get('/catalog', (req, res) => {
    res.render('catalog', { products });
});

// Configure multer to store uploaded images in the 'public/images' folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid name conflicts
    }
});

const upload = multer({ storage: storage });

// Route to render the upload form
app.get('/upload', (req, res) => {
    res.render('upload');
});

// Route to handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
    const { name, description } = req.body;
    const image = '/images/' + req.file.filename;
    
    // Add new product to the array
    products.push({ name, description, image });
    
    // Redirect to catalog page
    res.redirect('/catalog');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
