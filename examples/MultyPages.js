let http = require('http');
let fs = require('fs');

let server = http.createServer(function (req,res) {
    console.log('URL of page ' + req.url);
    if (req.url === '/index'||req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        let readShort = fs.createReadStream(__dirname+'/index.ejs','utf8');
        readShort.pipe(res);
    }
    else if (req.url === '/stream' ){
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        let readShort = fs.createReadStream(__dirname+'/new.txt','utf8');
        readShort.pipe(res);
    }
    else if (req.url === '/json') {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        let obj = {
            model : 'PowerSlam' ,
            weight: '80kg',
            participent: 2
        };
        res.end(JSON.stringify(obj))
    }
    else if (req.url === '/html') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        fs.createReadStream(__dirname+'/index.ejs','utf8').pipe(res);
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        fs.createReadStream(__dirname+'/404.html','utf8').pipe(res);
    }
});
let port = 8080;
server.listen(8080,'127.0.0.1');
console.log('We are on port '+ port);