let fs = require('fs');
let txtReader = fs.readFileSync('text.txt','utf8');
let txtWriter = function(pathName){
    fs.writeFileSync(pathName,txtReader);
    };
txtWriter('new.txt');