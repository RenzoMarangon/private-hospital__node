const { Router } = require('express');
const { check } = require('express-validator');
const { turnsGetAll, turnsGetOne, turnsPost, turnsPut, turnsDelete } = require('../controllers/turn');
const { validateErrors, validateJWT } = require('../middlewares');
const { verifyTurn } = require('../middlewares/validate-turn');


const router = Router();


router.get('/', turnsGetAll );

router.get('/:id', turnsGetOne );

router.post('/',[
    validateJWT,
    verifyTurn,
    validateErrors
], turnsPost);

router.put('/:id',turnsPut)

router.delete('/:id', turnsDelete)




router.get('*',(req, res) => {
    res.send('404 | page not found'); 
});


module.exports = router;
