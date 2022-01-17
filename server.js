const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(__dirname + '/dist/StockWatch'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/StockWatch/index.html'))
});


app.listen(8080, console.log(`Server is running on port: 8080`));