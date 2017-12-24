const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();

const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));


MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    require('./routes/note_routes')(app, database);
    console.log('database ==>'+database)
    app.listen(port, () => {
      console.log('We are live on ' + port);
    });               
  })

/*
MongoClient.connect(db.url, (err, database) => {
    app.post(
        '/notes',(req, res) => {
            const note = { text: req.body.body, title: req.body.title };
            console.log(req.body)
            db.collection('notes').insert(note, (err, result) => {
                if (err) { 
                  res.send({ 'error': 'An error has occurred' }); 
                } else {
                  res.send(result.ops[0]);
                }
            });
        }
    );

    app.listen(port, () => {
    console.log('We are live on ' + port);
    })
});*/