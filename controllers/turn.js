const { response } = require('express');


const Turn = require('../models/turn');
const Patient = require('../models/patient');

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

    const { date, time, doctor, patient } = req.body;

    const turn = new Turn({ date, time, patient })

    await turn.save();

    res.json({
        turn,
        
    })
}
const turnsPut = async( req, res = response ) => {

    res.json({
        turn
    })
}
const turnsDelete = async( req, res = response ) => {

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

