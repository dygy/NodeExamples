let express = require('express');

let app = express();

app.set("view engine","ejs");



app.get('/', function (req, res) {
   res.send('Home Page');
});
app.get('/news', function (req, res) {
    res.send('News Page');
});
app.get('/news/:num', function (req, res) {
    res.send('News Page number ' + req.params.id);
});
app.get('/number/:id', function (req, res) {
    const obj = {
        title:'Number',
           id:req.params.id,
        paragraphs: ['PH', 'PH1', 'PH2', 4]
    };
    res.render('nums',{numberID : req.params.id, obj : obj });
});
app.get('/file', function (req, res) {
    res.sendFile(__dirname + '/text.txt');
});

app.listen(8080);
