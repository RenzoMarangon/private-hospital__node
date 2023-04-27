const Role = require('../models/role');
const Patient = require('../models/patient');
const Turn = require('../models/turn');
const Doctor = require('../models/doctor');
const Specialization = require('../models/specialization');


const isRoleInDB = async(role = '') => {
    const roleExist = await Role.findOne({ role });

    if( !roleExist )
    {
        throw new Error(`${role} doesn't exist`);
    }
}

const isEmailInDB = async(email = '') => {
    //Verificar si el correo existe
    const promiseCollection = await Promise.all([
        Doctor.findOne({ email }),
        Patient.findOne({ email })
    ])
    
    if( promiseCollection[0] || promiseCollection[1])
    {
        throw new Error(`${ email } already exist`);
    }

}

const isPatientInDB = async( id ) => {
    const patientExist = await Patient.findById( id );

    if( !patientExist )
    {
        throw new Error(`Patient with id: ${ id } doesn't exist`);
    }
}

const isDoctorInDB = async( id ) => {
    const doctorExist = await Doctor.findById( id );

    if( !doctorExist )
    {
        throw new Error(`Patient with id: ${ id } doesn't exist`);
    }
}

const isTurnInDb = async( id ) => {
    const turnExist = await Turn.findById( id );

    if( !turnExist )
    {
        throw new Error(`Turn with id: ${ id } doesn't exist`);
    }
}

const isSpecializationInDb = async( specialization ) => {
    const specializationExist = await Specialization.findOne( {specialization} );

    if( !specializationExist )
    {
        throw new Error(`Specialization: ${ specialization } doesn't exist`);
    }

}


const collectionsAllowed = ( collection = '', collections = []) =>
{

    const includex = collections.includes( collection );

    if( !includex)
    {
        throw new Error(`Collection ${ collection } is not allowed`);
    }
}




module.exports = {
    isRoleInDB,
    isEmailInDB,
    isPatientInDB,
    isTurnInDb,
    isDoctorInDB,
    isSpecializationInDb,
    collectionsAllowed
}