const http = require('http');
const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
    res.send('Xin Chao Cac Ban')
})

app.get('/files/:tenfile', (req, res) => {
    var tenfile = req.params.tenfile;
    var file = fs.readFileSync('./files/' + tenfile);
    res.send(file)
})

server = http.createServer(app);

server.listen(3000);