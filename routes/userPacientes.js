const { Router } = require('express');
const { check } = require('express-validator');
const { 
    userGet, 
    userPost,
    userPut,
    userDelete,
    userListGet

} = require('../controllers/user');
const { isRoleInDB, isEmailInDB, isUserInDB } = require('../database/db-validators');
const { validateErrors } = require('../middlewares/validate-errors');

const router = Router();


router.get('/', userListGet );

router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('password','Password min length: 6').isLength({min:6}),
    check('email','Invalid email').isEmail(),
    // check('role','Role invalid').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( isRoleInDB ),
    check('email').custom( isEmailInDB ),
    validateErrors
], userPost);

router.put('/:id',[
    check('id').custom( isUserInDB ),
    check('id').isMongoId(),
    check('role').custom( isRoleInDB ),
    validateErrors
],userPut)

router.delete('/:id',[
    check('id').custom( isUserInDB ),
    check('id').isMongoId(),
    validateErrors
], userDelete)

router.get('*',(req, res) => {
    res.send('404 | page not found'); 
});


module.exports = router;