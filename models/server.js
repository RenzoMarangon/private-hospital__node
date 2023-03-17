const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPacientes = '/api/pacientes';
        this.authPath = '/api/auth'

        //Conectar a DB
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    routes(){

      this.app.use( this.authPath, require('../routes/auth') );
      this.app.use( this.userPacientes, require('../routes/userPacientes') );
    }


    async connectDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS 
        this.app.use( cors() );

        //Lectura y parseo del body (a formato json)
        this.app.use(express.json());

        //Servir contenido estatico
        this.app.use( express.static( 'public' ));
    }

    listen(){
        this.app.listen( this.port, ()=>{console.log('Server is listening port ', this.port)} );

    }
}

module.exports = Server;