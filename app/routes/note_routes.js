var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
    app.post('/notes/add', (req, res) => {
        const note = { text: req.body.body, title: req.body.title }
        db.collection('notes').insertOne(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'Ошибка добавления записи' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.get('/notes/:id', (req,res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').findOne(details, (err, item) => {
           if (err) {
               res.send({"error": "Ошибка поиска записи"});
           } else {
               res.send(item)
           }
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id)};
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({"error": "Ошибка удаления"})
            } else {
                res.send('Запись' + id + ' удалена!');
            }
        })
    });

    app.put ('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'Ошибка обновления записи'});
            } else {
                res.send(note);
            }
        });
    });

    app.get('/', (req,res) => {
       res.send('Notes Api')
    });
};

