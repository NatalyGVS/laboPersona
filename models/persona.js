'use strict'
/*Por cada coleccion de datos, tener un modelo */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonaSchema = Schema({
    nombre: String,
    apellidos: String,
   
});

module.exports = mongoose.model('Persona', PersonaSchema);
// mongoose pluraliza ese nombre, crea la coleccion llamada 'articles'
// articles --> guarda documentos de este tipo y con estructura dentro de la colección
