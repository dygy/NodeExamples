let http = require('http');
let fs = require('fs');


let server = http.createServer(function (req,res) {
    console.log('URL of page ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    let readShort = fs.createReadStream(__dirname+'/index.ejs','utf8');
    readShort.pipe(res);
});

let port = 8080;
server.listen(8080,'127.0.0.1');
console.log('We are on port '+ port);