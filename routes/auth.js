const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validateErrors } = require('../middlewares/validate-errors');

const router = Router();

router.post('/login',[
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateErrors
], login );


module.exports = router;