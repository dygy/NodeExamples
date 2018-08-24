let express = require('express');

let bodyParser = require('body-parser');

let app = express();

let urlencodedParser = bodyParser.urlencoded({extended:false});
app.set("view engine","ejs");

app.use('/examples',express.static('public'));

app.get('/', function (req, res) {
    res.send('Home Page');
});
app.get('/news', function (req, res) {
    res.render('news');
});
app.get('/news/:num', function (req, res) {
    res.send('News Page number ' + req.params.id);
});
app.get('/number/:id', function (req, res) {
    //send filters,ids
    console.log(req.query);

    const obj = {
        title:'Number',
        id:req.params.id,
        paragraphs: ['PH', 'PH1', 'PH2', 4]
    };
    res.render('nums',{numberID : req.params.id, obj : obj });
});
app.post('/number/:id',urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    const obj = {

        title:'Number',
        id:req.params.id,
        paragraphs: ['PH', 'PH1', 'PH2', 4]
    };
    res.render('new-page',{data: req.body});
});
app.get('/file', function (req, res) {
    res.sendFile(__dirname + '/text.txt');
});

app.listen(8080);
