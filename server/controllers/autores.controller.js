const { Autores } = require("../models/autores.model");

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}
//enviar todos los datos del producto-crear
module.exports.createAutores = async (request, response) => {
    try {
        const { author } = request.body;

        // Validamos que el autor tenga al menos 3 caracteres
        if (author.length < 3) {
            return response.status(400).json({ message: 'El nombre del autor debe tener al menos 3 caracteres' });
        }

        const autor = await Autores.create({
            author,
        });

        response.json(autor);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}


//obtener todo los Autores 
module.exports.getAllAutores = async (request, response) => {
    try {
        const autor = await Autores.find({})
        response.json(autor);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

//obtener Autores por Id
module.exports.getAutores = async (request, response) => {
    try {
        const autor = await Autores.findOne({_id:request.params.id})
        response.json(autor);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
    
}

//actualizar Autores 
module.exports.updateAutores = async (request, response) => {
    try {
        const autor = await Autores.findOne({_id: request.params.id});

        if (!autor) {
            return response.status(404).json({error: 'Autor no encontrado'});
        }

        autor.author = request.body.author;

        const validationErrors = autor.validateSync();

        if (validationErrors) {
            return response.status(400).json(validationErrors);
        }

        const updatedAutor = await autor.save();
        response.json(updatedAutor);

    } catch (error) {
        response.status(400);
        response.json(error);
    }
}


//eliminar Autores
module.exports.deleteAutores = async (request, response) => {
    try {
        const autor = await Autores.findByIdAndDelete({ _id: request.params.id })
        response.json(autor);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}