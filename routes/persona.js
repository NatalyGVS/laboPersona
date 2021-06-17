'use strict'

var express = require('express');
var PersonaController = require('../controllers/persona'); // cargar el controlador

var router = express.Router();

router.get('/personas/:last?', PersonaController.getPersonas); // ? parametro opcional
router.post('/save', PersonaController.save);
router.get('/persona/:id', PersonaController.getPersona);


router.put('/personas/:id', PersonaController.update);
router.delete('/personas/:id', PersonaController.delete);
module.exports = router; // para usarla en otros módulos, en el app.js