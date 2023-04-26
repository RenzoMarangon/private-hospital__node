const { Router } = require('express');
const { check } = require('express-validator');
const { 
    doctorGet, 
    doctorPost,
    doctorPut,
    doctorDelete,
    doctorListGet

} = require('../controllers/doctor');
const { isRoleInDB, isEmailInDB, isDoctorInDB, isPatientInDB, isSpecializationInDb } = require('../database/db-validators');


const { 
    validateErrors,
    validateJWT,
    isAdminRole,
    isRole, 
    } = require('../middlewares/index')

const router = Router();


router.get('/', doctorListGet );

router.get('/:id', doctorGet );

router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('password','Password min length: 6').isLength({min:6}),
    check('email','Invalid email').isEmail(),
    // check('role','Role invalid').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( isRoleInDB ),
    check('email').custom( isEmailInDB ),
    check('specialization').custom( isSpecializationInDb ),
    validateErrors
], doctorPost);

router.put('/:id',[
    check('id').custom( isDoctorInDB ),
    check('id').custom( isPatientInDB ),
    check('id').isMongoId(),
    check('role').custom( isRoleInDB ),
    check('specialization').custom( isSpecializationInDb ),
    validateErrors
],doctorPut)

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    // isRole('ADMIN_ROLE'),
    check('id').custom( isDoctorInDB ),
    check('id').isMongoId(),
    validateErrors
], doctorDelete)

router.get('*',(req, res) => {
    res.send('404 | page not found'); 
});


module.exports = router;