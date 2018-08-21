let http = require('http');

let server = http.createServer(function (req,res) {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    let obj = {
        model : 'PowerSlam' ,
        weight: '80kg',
        participent: 2
    };
    res.end(JSON.stringify(obj))
});

let port = 8080;
server.listen(8080,'127.0.0.1');
console.log('We are on port '+ port);