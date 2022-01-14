function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
const express = require('express');
const path = require('path');
const app = express();
app.use(requireHTTPS);

app.use(express.static('./dist/StockWatch'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: 'dist/stockWatch/'}
  );
});

app.listen(8080, console.log(`Server is running on port: 8080`));