const { Schema, model } = require('mongoose');


const SpecializationSchema = Schema({
    name:{
        type: String,
        require:[true,'Specialization is required']
    }
})


SpecializationSchema.methods.toJSON = function(){
    const { __v, _id, ...specialization } = this.toObject();
    specialization.uid = _id;
    return specialization;

}

module.exports = model('Specialization', SpecializationSchema );