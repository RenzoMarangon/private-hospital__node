const { v4: uuidv4 } = require('uuid');
const path = require('path')

const uploadFile = ( files, allowedExtentions = ['png','jpg','jpeg'], folder = '' ) => {

    return new Promise( (resolve, reject ) =>{

        const { file } = files;

        const cutedFile = file.name.split('.');
        const extention = cutedFile[ cutedFile.length-1 ]; 
    
        //Validate extention
        if( !allowedExtentions.includes( extention ))
        {
            reject(`Extention ${ extention } isn't valid. Valid extentions: ${ allowedExtentions }`)
        }
    
        //Create a temporal name to file
        const nameTemp = uuidv4() + '.' + extention;
    
        const uploadPath = path.join( __dirname , '../uploads/', folder , nameTemp) ;
    
        file.mv(uploadPath, function(err) {
            if (err) {
                reject( err )
            }
    
            resolve( nameTemp )
        });


    })

}

module.exports = 
{
    uploadFile
}