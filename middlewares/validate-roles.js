const { response } = require("express");


const isAdminRole = (req, res = response, next ) => 
{
    if( !req.authenticatedPatient )
    {   //Validar que esta llegando el token
        return res.status(500).json({
            msg:"Can't validate role before validate token"
        })
    }

    const { role, name } = req.authenticatedPatient;

    console.log(role);

    if( role !== 'ADMIN_ROLE')
    {
        return res.status(401).json({
            msg:"Patient is don't admin"
        })
    }

    next();
}


const isRole = (...roles) => {
    return ( req, res = response, next ) =>{
        
        if( !req.authenticatedPatient )
        {   //Validar que esta llegando el token
            return res.status(500).json({
                msg:"Can't validate role before validate token"
            })
        }

        if( !roles.includes( req.authenticatedPatient.role ) )
        {
            return res.status(401).json({
                msg:`${ req.authenticatedPatient.role } is an invalid role, valid roles: ${ roles }`
            })
        }

        next();
    }
}

module.exports = { isAdminRole,isRole };