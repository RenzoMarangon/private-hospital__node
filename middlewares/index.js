const validateErrors = require('../middlewares/validate-errors');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');


module.exports = {
    ...validateErrors,
    ...validateJWT,
    ...validateRoles,
}
