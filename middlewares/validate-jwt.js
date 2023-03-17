const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const validateJWT = async( req, res = response, next) => {
    
    const token =  req.header('token');


    if(!token)
    {
        return res.status(401).json({
            msg:'Invalid token'
        })
    }


    try {
        const { uid } = jwt.verify( token,process.env.SECRETORPRIVATEKEY );
        req.uid = uid; 

        //Leer user que corresponde al ID
        const user = await User.findById( uid );
        req.authenticatedUser = user;

        //Verificar si existe
        if(!user)
        {
            return res.status(401).json({
                msg:"User don't exist"
            })
        }

        //Verificar si user : true
        if( !user.state )
        {
            return res.status(401).json({
                msg:"User don't exist"
            })
        }


        next();
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg:'Invalid token'
        })
    }
}

module.exports = {
    validateJWT
}