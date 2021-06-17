'use strict'
/*Por cada coleccion de datos, tener un modelo */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MensajeSchema = Schema({
    usuario: String,
    mensaje: String,
   
});

module.exports = mongoose.model('Mensaje', MensajeSchema);
// mongoose pluraliza ese nombre, crea la coleccion llamada 'articles'
// articles --> guarda documentos de este tipo y con estructura dentro de la colección
