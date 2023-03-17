const jwt = require('jsonwebtoken')

const generateJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => 
    {
         const payload = { uid };

         jwt.sign( payload, process.env.SECRETORPRIVATEKEY,
            {
                 
                expiresIn:'180d'

            }, (err, token ) => {
                if(err)
                {
                    console.log(err);
                    reject("Can't generate a JWT");

                }else{
                    resolve( token )
                }
            }) 
    })
}

module.exports = {
    generateJWT
}