const { response } = require('express');
const jwt = require('jsonwebtoken');
const Patient = require('../models/patient');

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

        //Leer patient que corresponde al ID
        const patient = await Patient.findById( uid );
        req.authenticatedPatient = patient;

        //Verificar si existe
        if(!patient)
        {
            return res.status(401).json({
                msg:"Patient don't exist"
            })
        }

        //Verificar si patient : true
        if( !patient.state )
        {
            return res.status(401).json({
                msg:"Patient don't exist"
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