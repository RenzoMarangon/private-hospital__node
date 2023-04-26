const { response } = require('express');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const Specialization = require('../models/specialization');
const { ObjectId } = require('mongoose').Types;

const allowCollections = [ 'doctor','patient', 'specialization'];


const searchDoctors = async( object = '', res = response) => {
    const isMongoID = ObjectId.isValid( object ); //TRUE

    if(isMongoID)
    {
        const doctor = await Doctor.findById( object );

        return res.json({
            results: ( doctor ) ? [ doctor] : []
        })
    }

    //Expresion regular insensible a las mayusculas o minisculas
    const regex = RegExp( object, "i");

    const doctors = await Doctor.find({ 
        $or: [{name: regex }, {email: regex}, { specialization: regex }],
        $and: [{state:true}]
    });


    const count = await Doctor.count({ 
        $or: [{name: regex }, {email: regex}, { specialization: regex }],
        $and: [{state:true}]
    });

    return res.json({
        results: doctors,
        count
    })
}



const searchPatients = async( object = '', res = response) => {
    const isMongoID = ObjectId.isValid( object ); //TRUE

    if(isMongoID)
    {
        const patient = await Patient.findById( object );

        return res.json({
            results: ( patient ) ? [ patient] : []
        })
    }

    //Expresion regular insensible a las mayusculas o minisculas
    const regex = RegExp( object, "i");

    const patients = await Patient.find({ 
        $or: [{name: regex }, {email: regex}],
        $and: [{state:true}]
    });

    const count = await Patient.count({ 
        $or: [{name: regex }, {email: regex}],
        $and: [{state:true}]
    });

    return res.json({
        results: patients,
        count
    })
}


const searchSpecialization = async( object = '', res = response) => {
    const isMongoID = ObjectId.isValid( object ); //TRUE

    if(isMongoID)
    {
        const specialization = await Specialization.findById( object );

        return res.json({
            results: ( specialization) ? [ specialization ] : []
        })
    }

    //Expresion regular insensible a las mayusculas o minisculas
    const regex = RegExp( object, "i");

    const specializations = await Specialization.find({ name: regex },{state:true});

    const count = await Specialization.count({ name: regex },{state:true});

    return res.json({
        results: specializations,
        count
    })
}



const search = (req, res = response) => 
{

    const { collection, object } = req.params;

    if( !allowCollections.includes( collection ))
    {
        return res.status(400).json({
            msg: `Collections allowed: ${ allowCollections }`
        })
    }



    switch (collection) {
        case 'doctor':
            searchDoctors(object, res);
        break;

        case 'patient':
            searchPatients(object, res);
        break;

        case 'specialization':
            searchSpecialization(object, res);
        break;
    
        default:
            res.status(500).json({
                msg: "Search don't working"
            });
    }


}


module.exports = {
    search,
}