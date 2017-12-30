module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
      console.log('db ==>'+db)
      const note = { text: req.body.body, title: req.body.title };
      db.collection('notes').insert(note, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });
  };

  module.exports = function(app, db){
    app.get('/notes/:id', (req, res) =>{
      const id = req.params.id
      var ObjectID = require('mongodb').ObjectID;
      const details = { '_id': new ObjectID(id) };
      db.collection('notes').findOne(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send(item);
        } 
      });      
    })
  }