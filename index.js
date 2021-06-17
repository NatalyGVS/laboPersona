'use strict' 

 var mongoose = require('mongoose');
 var app = require('./app'); // ya lo reconoce como .js
 var port = 3000;
 var Mensaje = require('./models/mensaje'); // importo el modelo

 
 mongoose.set('useFindAndModify', false);/* forzar a q los metodos antiguos se desactiven, Se usa los metodos nuevos q estan en la DOCUMENTACION. */
 mongoose.Promise = global.Promise; /*para evitar ciertos fallos al conectarnos o usar otras cosas de mongodb */

 mongoose.connect('mongodb://localhost:27017/api_dad', { useNewUrlParser: true, useUnifiedTopology: true })
         .then(() => {
             console.log('Conexión a la base de datos correcta !!!');
             // Crear servidor y ponerme a escuchar peticiones HTTP
             app.listen(port, () => {
                 console.log('Servidor corriendo en http://localhost:'+port);
             });
         });

         /*
const { Server } = require("net");

const host = "0.0.0.0";
const END = "CERRAR";

const connections = new Map();

const error = (message) => {
  console.error(message);
  process.exit(1);
};

const sendMessage = (message, origin) => {
  for (const socket of connections.keys()) {
    if (socket !== origin) {
      socket.write(message);
    }
  }
};

const listen = (port) => {
  const server = new Server();

  server.on("connection", (socket) => {
    const remoteSocket = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`Nueva conexion ${remoteSocket}`);
    socket.setEncoding("utf-8");

    socket.on("data", (message) => {
      connections.values();
      if (!connections.has(socket)) {
        console.log(`Usuario ${message} conectado ${remoteSocket}`);
        connections.set(socket, message);

      } else if (message === END) {
        connections.delete(socket);
        socket.end();
      } else {


        const fullMessage = `[${connections.get(socket)}]: ${message}`;
        console.log(`${remoteSocket} -> ${fullMessage}`);
        sendMessage(fullMessage, socket);
        //guardar en la BD

        var mensaje = new Mensaje();

            // Asignar valores
            mensaje.usuario = connections.get(socket);
            mensaje.mensaje = message;
          
            // Guardar el articulo en la BD (met odo save)
            mensaje.save((err, mensajeStored) => {

                // if(err || !mensajeStored){
                //     return res.status(404).send({
                //         status: 'error',
                //         message: 'El mensaje no se ha guardado !!!'
                //     });
                // }              
            });

      }
    });

    socket.on("error", (err) => console.error(err));

    socket.on("close", () => {
      console.log(`Conexion con el cliente del puerto ${remoteSocket} cerrada`);
    });
  });

  server.listen({ port , host }, () => {
    console.log("Conectado al puerto ", port);
  });

  server.on("error", (err) => error(err.message));
};

const main = () => {
  if (process.argv.length !== 3) {
    error(`Usage: node ${__filename} port`);
  }

  let port = process.argv[2];
  if (isNaN(port)) {
    error(`Puerto invalido ${port}`);
  }

  port = Number(port);

  listen(port);
};

if (require.main === module) {
  main();
}
*/