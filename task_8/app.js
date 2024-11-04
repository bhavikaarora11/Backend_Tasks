const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route to render the contact form
app.get('/contact', (req, res) => {
    res.send(`
        <form action="/contact" method="POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br><br>
            <label for="message">Message:</label><br>
            <textarea id="message" name="message" rows="4" cols="50" required></textarea><br><br>
            <button type="submit">Submit</button>
        </form>
    `);
});

// Route to handle form submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.send('All fields are required!');
    }

    res.send(`
        <h1>Thank you, ${name}!</h1>
        <p>We have received your message:</p>
        <blockquote>${message}</blockquote>
        <p>We will get back to you at ${email}.</p>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});