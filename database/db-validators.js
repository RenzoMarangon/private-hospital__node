const Role = require('../models/role');
const Patient = require('../models/patient');
const Turn = require('../models/turn');


const isRoleInDB = async(role = '') => {
    const roleExist = await Role.findOne({ role });

    if( !roleExist )
    {
        throw new Error(`${role} doesn't exist`);
    }
}

const isEmailInDB = async(email = '') => {
    //Verificar si el correo existe
    const emailExist = await Patient.findOne({ email })

    if( emailExist )
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

const isTurnInDb = async( id ) => {
    const turnExist = await Turn.findById( id );

    if( !turnExist )
    {
        throw new Error(`Turn with id: ${ id } doesn't exist`);
    }
}




module.exports = {
    isRoleInDB,
    isEmailInDB,
    isPatientInDB,
    isTurnInDb
}