const validateErrors = require('../middlewares/validate-errors');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');
const validateFileToUpload = require('../middlewares/validate-file');


module.exports = {
    ...validateErrors,
    ...validateJWT,
    ...validateRoles,
    ...validateFileToUpload,
}
