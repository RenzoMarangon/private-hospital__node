const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/users');
const { generateJWT } = require("../database/generate-jwt");
const { googleVerify } = require("../database/google-verify");


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


const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;


    try {
        
        const payload = await googleVerify( id_token );

        const {name, email, img} = payload;

        let user = await User.findOne({ email });


        if(!!!user)
        {
            const data = {
                name,
                email,
                password:"asd",
                img,
                google:true,
                role:'USER_ROLE'
            }
            user = new User( data );
            await user.save().catch( console.log )
        }

        if( !user.state )
        {
            return res.status(401).json({
                error:'This user was been blocked'
            })
        }


        //Generar JWT
        const token = await generateJWT( user.uid );

        res.json({
            user,
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