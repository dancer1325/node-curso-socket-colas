const express = require('express');
const cors = require('cors');

const { socketController } = require('../sockets/controller');

class Server {
// Class to manage the express app
    constructor() {
        this.app    = express(); // Create express app. Use this because it's in that context
        this.port   = process.env.PORT; // Manage the variable port indicated in the .env file
        this.server = require('http').createServer( this.app ); // Create a Node.js HTTP server
        this.io     = require('socket.io')( this.server ); // Attach socket.io to a plain Node.js HTTP server

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público -- Mount the specific middleware function for serving static files
        this.app.use( express.static('public') ); // Indicate the static webServer folder in which to look for the index.html

    }

    routes() { // Router aren't necessary using the WebSocket protocol
        
        // this.app.use( this.paths.auth, require('../routes/auth'));
        
    }

    sockets() {

        this.io.on('connection', socketController ); // Listen on a new connection is opened
        // socketController is a callback function. If you don't indicate name --> It's an anonymous function
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;