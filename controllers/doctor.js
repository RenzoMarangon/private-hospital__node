const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Doctor = require('../models/doctor');


const doctorGet = async( req, res = response ) => {

    const { id } = req.params;

    const doctor = await Doctor.findById( id );


    res.json({
        doctor
    })
}


const doctorListGet = async( req, res = response ) => {
    const { page = 1, limit = 5 } = req.query;

    if( isNaN(page) || isNaN(limit) )
    {
        res.json({
            error:'Page or limit is not a number'
        })
        return;
    }

    const promisesCollection = await Promise.all([
        Doctor.count({ state: true}),
        Doctor.find({ state: true })
        .skip(Number( page ))
        .limit(Number( limit ))
    ])

    res.json({
        doctors:promisesCollection[1],
        totalDoctors:promisesCollection[0]
    })
}


const doctorPost = async( req, res = response ) => {

    // const { name } = req.body;

    const { name, email, password, role, specialization } = req.body;
    const doctor = new Doctor( { name, email, password, role, specialization } )


    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); //Mientras mas alto el numero mas encriptado el pass, default:10;
    //Encripto y guardo el pass
    doctor.password = bcryptjs. hashSync( password, salt );
    //Guardo el doctor en la db
    await doctor.save();

    res.json({
        payload:doctor
    })
}

const doctorPut = async( req, res = response ) => {

    const { id } = req.params;

    const {_id, state, password, email, ...doctorInfo } = req.body;

    //TODO validar en la DB
    if( password )
    {
        const salt = bcryptjs.genSaltSync();
        doctorInfo.password = bcryptjs.hashSync( password, salt);
    }

    const doctor = await Doctor.findByIdAndUpdate( id, doctorInfo )

    res.json({
        doctor
    })
}
const doctorDelete = async( req, res = response ) => {

    const { id } = req.params;

    const authenticatedDoctor = req.authenticatedDoctor;

    const doctor = await Doctor.findByIdAndUpdate( id, {state:false} )

    res.json({
        doctor,
        authenticatedDoctor
    })
}


module.exports = {
    doctorGet,
    doctorPost,
    doctorPut,
    doctorDelete,
    doctorListGet
}