const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(__dirname + '/dist/stock-watch'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/stock-watch/index.html'))
});


app.listen(8080, console.log(`Server is running on port: 8080`));