const http = require('http');
const express = require('express');
const fs = require('fs');
var Xu_ly_Tham_so = require('querystring');
var uuidv1 = require('uuid/v1');
var fileType = require('file-type');

const app = express();

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

function tao_ten_file(loai_file){
    var ten_file = uuidv1();

    if(loai_file == "image/jpeg"){
        ten_file += ".jpg";
    }
    else if(loai_file == "image/png"){
        ten_file += ".png";
    }
    else if(loai_file == "image/gif"){
        ten_file += ".gif";
    }

    return ten_file;
}

app.get('/', (req, res) => {
    res.send('Xin Chao Cac Ban')
})

app.get('/files/:tenfile', (req, res) => {
    var tenfile = req.params.tenfile;
    var file = fs.readFileSync('./files/' + tenfile);
    res.send(file)
})

app.post('/', (req, res) => {
    var Chuoi_Nhan = ""
    req.on('data', (chunk) => { Chuoi_Nhan += chunk });
    req.on("end", () => {
        //console.log(req.images);
        Chuoi_Nhan = Xu_ly_Tham_so.parse(Chuoi_Nhan);
        //console.log(Chuoi_Nhan.hinh);

        var imageBuffer = decodeBase64Image(Chuoi_Nhan.hinh);

        var ten_file = tao_ten_file(imageBuffer.type);

        //console.log(imageBuffer);

        fs.writeFileSync("images/" + ten_file, imageBuffer.data);

        res.setHeader("Access-Control-Allow-Origin", '*')
        res.end("thành công");
    })
})
server = http.createServer(app);

server.listen(3000);