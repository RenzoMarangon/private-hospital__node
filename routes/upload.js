const { Router } = require('express');
const { check } = require('express-validator');


const { validateErrors } = require('../middlewares/validate-errors');
const { loadFile, getImage, refreshImageCloduinary } = require('../controllers/upload');
const { collectionsAllowed } = require('../database/db-validators');
const { validateFileToUpload } = require('../middlewares');

const router = Router();

// router.post('/',[
//     validateFileToUpload,
// ], loadFile);


router.put('/:collection/:id',[
    validateFileToUpload,
    check('id','ID is not valid').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['doctor','patient','specialization'] ) ),
], refreshImageCloduinary);


router.get('/:collection/:id',[
    check('id','ID is not valid').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['doctor','patient','specialization'] ) ),
], getImage);


module.exports = router;