const { Schema, model } = require('mongoose');


const DoctorSchema = Schema({
    name:{
        type: String,
        required: [true,'Name required']
    },
    email:{
        type: String,
        required: [true,'Email required'],
        unique: true
    },
    dni:{
        type:Number,
        // required: [true,'DNI required'],
        // unique: true

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
    state:{
        type:Boolean,
        default:true,
    },
    turn:{
        type:Array
    },
    specialization:{
        type:String,
        required:true
    }
});


DoctorSchema.methods.toJSON = function(){
    const { __v, _id , password, google,...doctor } = this.toObject();
    doctor.uid = _id;
    return doctor;

}

module.exports = model('Doctor', DoctorSchema);
