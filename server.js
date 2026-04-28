const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for root path or explicit /home requests
app.get(['/', '/home'], (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Any undefined route will be caught by this
app.use((req, res) => {
    res.status(404).send(`
    <!DOCTYPE html>
    <html lang="nl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 - Pagina niet gevonden</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body style="display:flex; align-items:center; justify-content:center; height:100vh; text-align:center;">
        <div class="glass-panel" style="max-width: 500px; width: 100%;">
            <h1 style="font-size: 4rem; color: var(--accent-cyan); margin-bottom: 20px;">404</h1>
            <p style="font-size: 1.2rem; margin-bottom: 30px;">Oeps! De pagina die je zoekt bestaat niet.</p>
            <a href="/" class="btn">Terug naar Home</a>
        </div>
    </body>
    </html>
    `);
});

app.listen(port, () => {
    console.log(`🚀 Server draait op poort ${port}. Ga naar http://localhost:${port} in je browser!`);
});