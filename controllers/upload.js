const { response } = require("express");
const path = require('path');
const fs = require('fs');

const { uploadFile } = require("../database/upload-files");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Specialization = require("../models/specialization");

//Cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL);

const loadFile = async(req, res = response) => 
{

    try {
        //Imgs
        const fileName = await uploadFile(req.files,undefined,'imgs' )

        return res.json({ fileName })

    } catch (error) {
        return res.status(400).json(error);
    }

}


const refreshImage = async( req, res = response) => 
{

    const { collection, id } = req.params;

    let model;

    switch ( collection ) {
        case 'doctor':

                model = await Doctor.findById( id );
                if(!model)
                {
                    return res.status(400).json({ msg: `Doctor with ID #${ id } does not exist`});
                }
        break;

        case 'patient':
            model = await Patient.findById( id );
            if(!model)
            {
                return res.status(400).json({ msg: `Patient with ID #${ id } does not exist`});
            }
        break;

        case 'specialization':
            model = await Specialization.findById( id );
            if(!model)
            {
                return res.status(400).json({ msg: `Specialization with ID #${ id } does not exist`});
            }
        break;
    
        default:
            return res.status(500).json({ msg: 'This collection is not working' });
    }

    
    //Clean old images
    
    if(model.img)
    {
        const pathImage = path.join( __dirname, '../uploads/', collection, model.img)

        if(fs.existsSync( pathImage ))
        {
            fs.unlinkSync( pathImage );
        }
    }



    const name = await uploadFile(req.files,undefined, collection );
    model.img = name;

    await model.save();

    return res.json( model );

   



}
const refreshImageCloduinary = async( req, res = response) => 
{

    const { collection, id } = req.params;

    let model;

    switch ( collection ) {
        case 'doctor':

                model = await Doctor.findById( id );
                if(!model)
                {
                    return res.status(400).json({ msg: `Doctor with ID #${ id } does not exist`});
                }
        break;

        case 'patient':
            model = await Patient.findById( id );
            if(!model)
            {
                return res.status(400).json({ msg: `Patient with ID #${ id } does not exist`});
            }
        break;

        case 'specialization':
            model = await Specialization.findById( id );
            if(!model)
            {
                return res.status(400).json({ msg: `Specialization with ID #${ id } does not exist`});
            }
        break;
    
        default:
            return res.status(500).json({ msg: 'This collection is not working' });
    }

    
    //Clean old images
    
    if(model.img)
    {
        const nameArr = model.img.split('/');
        const name    = nameArr[ nameArr.length -1 ];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.file;

    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    model.img = secure_url;

    await model.save();

    return res.json( model );

   



}

const getImage = async( req, res = response) => {
    const { collection, id } = req.params;

    let model;

    switch ( collection ) {
        case 'doctor':

                model = await Doctor.findById( id );
                if(!model)
                {
                    return res.status(400).json({ msg: `Doctor with ID #${ id } does not exist`});
                }
        break;

        case 'patient':
            model = await Patient.findById( id );
            if(!model)
            {
                return res.status(400).json({ msg: `Patient with ID #${ id } does not exist`});
            }
        break;

        case 'specialization':
            model = await Specialization.findById( id );
            if(!model)
            {
                return res.status(400).json({ msg: `Specialization with ID #${ id } does not exist`});
            }
        break;
    
        default:
            return res.status(500).json({ msg: 'This collection is not working' });
    }

    
    //Show image
    
    if(model.img)
    {
        return res.json( {img:model.img});
    }

    const pathImage = path.join( __dirname, '../public/img-not-found.jpg')
    res.sendFile(pathImage)
    
}


module.exports = 
{
    loadFile,
    refreshImage,
    getImage,
    refreshImageCloduinary
}