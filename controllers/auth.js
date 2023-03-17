const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/users');
const { generateJWT } = require("../database/generate-jwt");


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar email
        const user = await User.findOne({ email })

        if(!user)
        {
            return res.status(400).json({
                msg:'User or password incorrect'
            })
        }

        //Verificar user active
        if(!user.state)
        {
            return res.status(400).json({
                msg:"User doesn't exist"
            })
        }
        
        //Verificar password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword)
        {
            return res.status(400).json({
                msg:'User or password incorrect'
            })
        }

        //Generar JWT
        const token = await generateJWT( user.id );        

        res.status(500).json({
            user,
            token
        })
 
    } catch (error) {
        console.log(err);
        res.status(500).json({
            msg:'Something went wrong'
        })
    }

}

module.exports = {
    login
}