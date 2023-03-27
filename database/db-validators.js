const Role = require('../models/role');
const Patient = require('../models/patient');
const Turn = require('../models/turn');

const moment = require('moment')

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

const timeIsValid = ( date, time ) => {

    if(!moment( `${date} ${time}`, 'YYYY-MM-DD HH:mm',true ),isValid() ){
        throw new Error(`Date or time are wrong`);
    }

}


const isTimeInDB = () => {


}




module.exports = {
    isRoleInDB,
    isEmailInDB,
    isPatientInDB,
    timeIsValid
}