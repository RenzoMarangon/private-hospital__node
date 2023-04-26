const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = 
        {
            userPatients   : '/api/patient',
            auth           : '/api/auth',
            turns          : '/api/turn',
            doctor         : '/api/doctor',
            search         : '/api/search',
            specialization : '/api/specialization',
        }

        //Conectar a DB
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    routes(){

      this.app.use( this.paths.auth, require('../routes/auth') );
      this.app.use( this.paths.userPatients, require('../routes/userPacientes') );
      this.app.use( this.paths.turns, require('../routes/turn') );
      this.app.use( this.paths.doctor, require('../routes/doctors') );
      this.app.use( this.paths.search, require('../routes/search') );
      this.app.use( this.paths.specialization, require('../routes/specialization') );
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