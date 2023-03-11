const { Router } = require('express');
const { check } = require('express-validator');
const { 
    userPacientesGet, 
    userPacientesPost,
    userPacientesPut,
    userPacientesDelete

} = require('../controllers/userPacientes');
const { validateErrors } = require('../middlewares/validate-errors');

const router = Router();


router.get(   '/', userPacientesGet );

router.post(  '/',[
    check('name','Name is required').not().isEmpty(),
    check('password','Password min length: 6').isLength({min:6}),
    check('email','Invalid email').isEmail(),
    check('role','Role invalid').isIn(['ADMIN_ROLE','USER_ROLE']),
    validateErrors
], userPacientesPost);

router.put(   '/:id', userPacientesPut)

router.delete('/:id', userPacientesDelete)

router.get('*',(req, res) => {
    res.send('404 | page not found'); 
});


module.exports = router;