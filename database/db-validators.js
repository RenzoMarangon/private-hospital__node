const Role = require('../models/role');
const User = require('../models/users');

const isRoleInDB = async(role = '') => {
    const roleExist = await Role.findOne({ role });

    if( !roleExist )
    {
        throw new Error(`${role} doesn't exist`);
    }
}

const isEmailInDB = async(email = '') => {
    //Verificar si el correo existe
    const emailExist = await User.findOne({ email })

    if( emailExist )
    {
        throw new Error(`${ email } already exist`);
    }
}

const isUserInDB = async( id ) => {
    const userExist = await User.findById( id );

    if( !userExist )
    {
        throw new Error(`User with id: ${ id } doesn't exist`);
    }
}






module.exports = {
    isRoleInDB,
    isEmailInDB,
    isUserInDB
}