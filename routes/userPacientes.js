const { Router } = require('express');
const { check } = require('express-validator');
const { 
    patientGet, 
    patientPost,
    patientPut,
    patientDelete,
    patientListGet

} = require('../controllers/patient');
const { isRoleInDB, isEmailInDB, isPatientInDB } = require('../database/db-validators');


const { 
    validateErrors,
    validateJWT,
    isAdminRole,
    isRole, 
    } = require('../middlewares/index')

const router = Router();


router.get('/', patientListGet );

router.get('/:id', patientGet );

router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('password','Password min length: 6').isLength({min:6}),
    check('email','Invalid email').isEmail(),
    // check('role','Role invalid').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( isRoleInDB ),
    check('email').custom( isEmailInDB ),
    validateErrors
], patientPost);

router.put('/:id',[
    check('id').custom( isPatientInDB ),
    check('id').isMongoId(),
    check('role').custom( isRoleInDB ),
    validateErrors
],patientPut)

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    // isRole('ADMIN_ROLE'),
    check('id').custom( isPatientInDB ),
    check('id').isMongoId(),
    validateErrors
], patientDelete)

router.get('*',(req, res) => {
    res.send('404 | page not found'); 
});


module.exports = router;