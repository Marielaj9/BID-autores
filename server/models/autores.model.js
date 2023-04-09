const mongoose = require('mongoose');
const AutoresSchema = new mongoose.Schema({
    author: { 
        type: String,
        required: true,
        minlength: 3
    },
    
}, { timestamps: true });

module.exports.Autores = mongoose.model('Autores', AutoresSchema);
