const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Patient = require('../models/patient');


const patientGet = async( req, res = response ) => {

    const { id } = req.params;

    const patient = await Patient.findById( id );


    res.json({
        patient
    })
}


const patientListGet = async( req, res = response ) => {
    const { page = 1, limit = 5 } = req.query;

    if( isNaN(page) || isNaN(limit) )
    {
        res.json({
            error:'Page or limit is not a number'
        })
        return;
    }

    const promisesCollection = await Promise.all([
        Patient.count({ state: true}),
        Patient.find({ state: true })
        .skip(Number( page ))
        .limit(Number( limit ))
    ])

    res.json({
        patients:promisesCollection[1],
        totalPatients:promisesCollection[0]
    })
}


const patientPost = async( req, res = response ) => {

    // const { name } = req.body;

    const { name, email, password, role } = req.body;
    const patient = new Patient( { name, email, password, role } )


    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); //Mientras mas alto el numero mas encriptado el pass, default:10;
    //Encripto y guardo el pass
    patient.password = bcryptjs. hashSync( password, salt );
    //Guardo el patient en la db
    await patient.save();

    res.json({
        payload:patient
    })
}

const patientPut = async( req, res = response ) => {

    const { id } = req.params;

    const {_id, state, password, email, ...patientInfo } = req.body;

    //TODO validar en la DB
    if( password )
    {
        const salt = bcryptjs.genSaltSync();
        patientInfo.password = bcryptjs.hashSync( password, salt);
    }

    const patient = await Patient.findByIdAndUpdate( id, patientInfo )

    res.json({
        patient
    })
}
const patientDelete = async( req, res = response ) => {

    const { id } = req.params;

    const authenticatedPatient = req.authenticatedPatient;

    const patient = await Patient.findByIdAndUpdate( id, {state:false} )

    res.json({
        patient,
        authenticatedPatient
    })
}


module.exports = {
    patientGet,
    patientPost,
    patientPut,
    patientDelete,
    patientListGet
}