const { Schema, model } = require('mongoose');


const RoleSchema = Schema({
    role:{
        type: String,
        require:[true,'Role is required']
    }
})


RoleSchema.methods.toJSON = function(){
    const { __v, _id, ...role } = this.toObject();
    role.uid = _id;
    return role;

}


module.exports = model('Role', RoleSchema );