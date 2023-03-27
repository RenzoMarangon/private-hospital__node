const { Schema, model } = require('mongoose');


const PatientSchema = Schema({
    name:{
        type: String,
        required: [true,'Name required']
    },
    email:{
        type: String,
        required: [true,'Email required'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'Password required']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE',
        // emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    google:{
        type:Boolean,
        default:false,
    },
    state:{
        type:Boolean,
        default:true,
    }
});


PatientSchema.methods.toJSON = function(){
    const { __v, _id , password, google,...patient } = this.toObject();
    patient.uid = _id;
    return patient;

}


module.exports = model('Patient', PatientSchema);