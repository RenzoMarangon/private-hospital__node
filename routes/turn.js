const { Router } = require('express');
const { check } = require('express-validator');
const { turnsGetAll, turnsGetOne, turnsPost, turnsPut, turnsDelete } = require('../controllers/turn');
const { isRoleInDB, isTurnInDb } = require('../database/db-validators');
const { validateErrors, validateJWT, isAdminRole } = require('../middlewares');
const { verifyTurn, patientHaveTurn, turnHaveSpecialization, doctorHaveTurn } = require('../middlewares/validate-turn');


const router = Router();


router.get('/',[
    validateJWT,
    isAdminRole,
    validateErrors
],turnsGetAll );

router.get('/:id',[
    validateJWT,
    isAdminRole,
    check('id').custom( isTurnInDb ),
    check('id').isMongoId(),
    validateErrors
],turnsGetOne );

router.post('/',[
    validateJWT,
    verifyTurn,
    patientHaveTurn,
    doctorHaveTurn,
    turnHaveSpecialization,
    isAdminRole,
    validateErrors
], turnsPost);

router.put('/:id',[
    validateJWT,
    isAdminRole,
    check('id').custom( isTurnInDb ),
    check('id').isMongoId(),
    validateErrors
],turnsPut)

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id').custom( isTurnInDb ),
    check('id').isMongoId(),
    validateErrors
],turnsDelete)


router.get('/*',(req, res) => {
    res.send('404 | page not found'); 
});


module.exports = router;
