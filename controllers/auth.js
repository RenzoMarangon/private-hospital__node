const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Patient = require('../models/patient');
const { generateJWT } = require("../database/generate-jwt");
const { googleVerify } = require("../database/google-verify");


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar email
        const patient = await Patient.findOne({ email })

        if(!patient)
        {
            return res.status(400).json({
                msg:'Patient or password incorrect'
            })
        }

        //Verificar patient active
        if(!patient.state)
        {
            return res.status(400).json({
                msg:"Patient doesn't exist"
            })
        }
        
        //Verificar password
        const validPassword = bcryptjs.compareSync(password, patient.password);
        if(!validPassword)
        {
            return res.status(400).json({
                msg:'Patient or password incorrect'
            })
        }

        //Generar JWT
        const token = await generateJWT( patient.id );        

        res.status(500).json({
            patient,
            token
        })
 
    } catch (error) {
        console.log(err);
        res.status(500).json({
            msg:'Something went wrong'
        })
    }

}


const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;


    try {
        
        const payload = await googleVerify( id_token );

        const {name, email, img} = payload;

        let patient = await Patient.findOne({ email });


        if(!patient)
        {
            const data = {
                name,
                email,
                password:"******",
                img,
                google:true,
                role:'USER_ROLE'
            }
            patient = new Patient( data );
            await patient.save().catch( console.log )
        }

        if( !patient.state )
        {
            return res.status(401).json({
                error:'This patient was been eliminated'
            })
        }


        //Generar JWT
        const token = await generateJWT( patient.uid );

        res.json({
            patient,
            token
        })

    } catch (error) {
        
        res.status(400).json({
            error:"Token couldn't be verificated"
        })
    }


}


module.exports = {
    login,
    googleSignIn
}