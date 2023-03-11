const { response } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/users');


const userPacientesGet = ( req, res = response ) => {

    const { page, limit } = req.query;


    res.json({
        payload:'pacientes get',  
        page,
        limit
    })
}
const userPacientesPost = async( req, res = response ) => {

    // const { name } = req.body;

    const { name, email, password, role } = req.body;
    const user = new User( { name, email, password, role } )

    //Verificar si el correo existe
    const emailExist = await User.findOne({ email })

    if( emailExist )
    {
        return res.status(400).json({
            msg:'Email already registered',
        })
    }

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); //Mientras mas alto el numero mas encriptado el pass, default:10;
    //Encripto y guardo el pass
    user.password = bcryptjs. hashSync( password, salt );
    //Guardo el user en la db
    await user.save();

    res.json({
        payload:user
    })
}
const userPacientesPut = ( req, res = response ) => {

    const { id } = req.params;

    res.json({
        payload:'pacientes put',
        id
    })
}
const userPacientesDelete = ( req, res = response ) => {

    const { id } = req.params;

    res.json({
        payload:'pacientes delete',
        id
    })
}


module.exports = {
    userPacientesGet,
    userPacientesPost,
    userPacientesPut,
    userPacientesDelete,
}