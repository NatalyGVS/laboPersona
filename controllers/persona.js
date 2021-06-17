'use strict'

var validator = require('validator');// para validar el tipo de dato
var path = require('path'); // para sacar la ruta de un archivo

var Persona = require('../models/persona'); // importo el modelo

var controller = {

     //controllers útiles
    save: (req, res) => {
        // Recoger parametros por post
        var params = req.body; 
        console.log(req, res);
        // Validar datos (librería : validator)
        try{                     // cuando no este vacío
            var validate_nombre = !validator.isEmpty(params.nombre); // da true si ese campo no este vacio
            var validate_apellidos = !validator.isEmpty(params.apellidos); // da true si ese campo no este vacio

        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            });
        }

        if(validate_nombre && validate_apellidos){ // comprobar la validacion
            
            //Crear el objeto a guardar
            var persona = new Persona();

            // Asignar valores
            persona.nombre = params.nombre;
            persona.apellidos = params.apellidos;

           
            // Guardar la persona en la BD (met odo save)
            persona.save((err, personaStored) => {

                if(err || !personaStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'La persona no se ha guardado !!!'
                    });
                }

                // Devolver una respuesta positiva
                return res.status(200).send({
                    status: 'success',
                    persona: personaStored
                });

            });

        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos !!!'
            });
        }
    }

   , getPersonas: (req, res) => {

      
        var query = Persona.find({});

        var last = req.params.last; // lo que pasas por el url
        if(last || last != undefined){
            query.limit(5);
        }
        // id : ordena por id ascendente 
        //-id : ordena por id descendente
        // Find: para sacar los datos de la bd
        query.sort('-_id').exec((err, personas) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver personas !!!'
                });
            }

            if(!personas){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay personas para mostrar !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                personas
            });

        });
    },
    
    getPersona: (req, res) => {

        // Recoger el id de la url
        var personaId = req.params.id;

        // Comprobar que existe
        if(!personaId || personaId == null){
            return res.status(404).send({
                status: 'error',
                message: 'La persona no existe !!!'
            });
        }

        // Buscar la persona
        Persona.findById(personaId, (err, persona) => {
            
            if(err || !persona){
                return res.status(404).send({
                    status: 'error',
                    message: 'La persona no existe !!!'
                });
            }

            // Devolverlo en json
            return res.status(200).send({
                status: 'success',
                persona
            });

        });
    },
    
    
    update: (req, res) => {
        // Recoger el id de la persona por la url
        var personaId = req.params.id;

        // Recoger los datos que llegan por put
        var params = req.body;

        // Validar datos
        try{
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_apellidos = !validator.isEmpty(params.apellidos);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            }); 
        }

        if(validate_nombre && validate_apellidos){
             // Find and update
             Persona.findOneAndUpdate({_id: personaId}, params, {new:true}, (err, personaUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar !!!'
                    });
                }

                if(!personaUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe la persona !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    persona: personaUpdated
                });
             });
        }else{
             // Devolver respuesta
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta !!!'
            });
        }
       
    },

    delete: (req, res) => {
        // Recoger el id de la url
        var personaId = req.params.id;

        // Find and delete
        Persona.findOneAndDelete({_id: personaId}, (err, personaRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar !!!'
                });
            }

            if(!personaRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado la persona, posiblemente no exista !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                persona: personaRemoved
            });

        }); 
    }

};  // end controller

module.exports = controller;