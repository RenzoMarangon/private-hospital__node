require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT

app.get('/',(req, res) => {
    res.send('Hello world') 
});


app.get('*',(req, res) => {
    res.send('404 | page not found') 
});

app.listen( port );
