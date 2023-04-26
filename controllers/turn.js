const { response } = require('express');
const moment = require('moment');

const Turn = require('../models/turn');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');

const turnsGetAll = async( req, res = response ) => {

    const turns = await Turn.find().populate('patient','name');


    res.json({
        turns
    })
}

const turnsGetOne = async( req, res = response ) => {

    const { id } = req.params;

    const turn = await Turn.findById( id )
        .populate('patient','name')

    res.json({
        turn
    })
}

const turnsPost = async( req, res = response ) => {

    let { date, time, specialization , doctorID, patientID } = req.body;

    time = time.substring(0, 5);

    const turn = new Turn({ date, time, patient:patientID, specialization })

    //Guardo el paciente
    const patient = await Patient.findById(patientID)
    patient.turn.push( { date, time, specialization, doctorID } )

    //Guardo el doctor
    const doctor = await Doctor.findById(doctorID);
    doctor.turn.push({ date, time, specialization, doctorID })

    const promisesCollection = await Promise.all([
        turn.save(),
        patient.save(),
        doctor.save()
    ])

    res.json({
        turn:promisesCollection[0],
    })
}
const turnsPut = async( req, res = response ) => {

    const { id } = req.params;

    const { _id, patient, doctor, ...turnInfo } = req.body;

    const turn = await Turn.findByIdAndUpdate( id, turnInfo )


    res.json({
        turn
    })
}
const turnsDelete = async( req, res = response ) => {

    const { id } = req.params;

    const turn = await Turn.findByIdAndDelete( id );

    res.json({
        turn
    })
}





module.exports =
{
    turnsGetAll,
    turnsGetOne,
    turnsPost,
    turnsPut,
    turnsDelete,
    
}

