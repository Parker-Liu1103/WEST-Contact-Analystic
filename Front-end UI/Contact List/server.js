var express = require('express')
var app = express();
var mongojs = require("mongojs");
const { config } = require('process');
var bodyParser = require("body-parser");
// app.get('/', function(req, res) {
//     res.send("Hellow World")
// });
var db = mongojs('contactlist', ['contactlist']);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {

    console.log("I received a GET request");

    db.contactlist.find((err, data) => {
        console.log(data);
        res.json(data);
    })
})

app.post('/contactlist', function (req, res) {
    console.log(req.body); //server has to parse the data from the request body
    db.contactlist.insert(req.body, function (err, doc) {
        res.json(doc);
    })
})
app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({ _id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });

})
app.get('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({ _id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    })
})

app.put('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAnyModify({
        query: { _id: mongojs.ObjectId(id) },
        update: { $set: { name: req.body.name, email: req.body.email, number: req.body.number } },
        new: true
    }, function (err, doc) {
        res.json(doc);
    })
})


app.listen(3000);
console.log("server running on Port 3000");