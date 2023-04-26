const Specialization = require('../models/specialization');

const specializationGetAll = async( req, res = response ) => {

    const specialization = await Specialization.find();


    res.json({
        specialization
    })
}

const specializationGetOne = async( req, res = response ) => {

    const { id } = req.params;

    const specialization = await Specialization.findById( id );

    res.json({
        specialization
    })
}

const specializationPost = async( req, res = response ) => {

    const { _id, name} = req.body;

    const newSpecialization = new Specialization({name})

    await newSpecialization.save()

    res.json({
        newSpecialization
    })
}
const specializationPut = async( req, res = response ) => {

    const { _id, name} = req.body;

    const newSpecialization = new Specialization({ name })

    await Specialization.findByIdAndUpdate( id, newSpecialization )


    res.json({
        turn
    })
}
const specializationDelete = async( req, res = response ) => {

    const { id } = req.params;

    const specialization = await Specialization.findByIdAndDelete( id );

    res.json({
        deleted : specialization
    })
}

module.exports = {
    specializationGetAll,
    specializationGetOne,
    specializationDelete,
    specializationPut,
    specializationPost
}