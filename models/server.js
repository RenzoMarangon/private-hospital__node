const express = require('express');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    routes(){
        this.app.get('/api',(req, res) => {
            res.send('Hello world'); 
        });

        this.app.get('*',(req, res) => {
            res.send('404 | page not found'); 
        });
    }


    middlewares(){
        this.app.use( express.static( 'public' ));
    }

    listen(){
        this.app.listen( this.port, ()=>{console.log('Server is listening port ', this.port)} );

    }
}

module.exports = Server;