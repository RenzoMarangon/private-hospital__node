const Router = require('express');
const { check } = require('express-validator');
const { specializationGetAll, specializationGetOne, specializationPost, specializationPut } = require('../controllers/specialization');
const { validateErrors, validateJWT, isAdminRole } = require('../middlewares');
const { isSpecializationInDb } = require('../database/db-validators');


const router = Router();

router.get('/', specializationGetAll);

router.get('/:id', specializationGetOne);

router.post('/',[
    validateJWT,
    isAdminRole,
    check('name','Specialization is required').not().isEmpty(),
    validateErrors
], specializationPost);

router.put('/',[
    validateJWT,
    isAdminRole,
    check('id').isMongoId(),
    check('name').custom( isSpecializationInDb ),
    validateErrors,
],specializationPut)

router.delete('/',[
    validateJWT,
    isAdminRole,
    check('id').isMongoId(),
    check('name').custom( isSpecializationInDb ),
    validateErrors,
],specializationPut)


module.exports = router