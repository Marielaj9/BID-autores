const AutoresController = require('../controllers/autores.controller');
module.exports = function(app){
    app.get('/api', AutoresController.index);
    app.post('/api/autores', AutoresController.createAutores);
    app.get('/api/autores',AutoresController.getAllAutores);
    app.get('/api/autores/:id',AutoresController.getAutores);
    app.put('/api/autores/:id',AutoresController.updateAutores);
    app.delete('/api/autores/:id',AutoresController.deleteAutores);
}
