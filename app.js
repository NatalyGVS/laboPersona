'use strict'


// Cargar modulos de node para crear servidor
var express = require('express'); // modulo q nos permite crear el servidor
var bodyParser = require('body-parser'); // cuadno reciba la petición podre transformarlo en un obj utilizado por JS, un json
var router = express.Router();

const app = express();
 // Cargar ficheros rutas
var article_routes = require('./routes/persona');
// Middlewares 
/**Middelware es algo que se ejecuta ates de cargar una ruta o un url de la aplicacion
 * Se usa para procesar un dato antes de ejecutar la ruta
 */
 app.use(bodyParser.urlencoded({extended:false})); //Cargar el bodyparser
 app.use(bodyParser.json()); //Convertir cualquier peticion q me llegue a un json

// CORS
/**es un middleware q se eejcuta antes de los metodos de las rutas que tenemos */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // que cualquier cliente pueda hacer peticiones ajax
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next(); // permtie pasar del middleware a lo siguietne q haya que hacer
});


// Añadir prefijos a rutas , por ejm un prefijo adelante
app.use('/api', article_routes); // carga la ruta dentro de express


module.exports = app;