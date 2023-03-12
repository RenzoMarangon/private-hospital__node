const { Schema, model } = require('mongoose');


const UsersSchema = Schema({
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
        required: [true,'Name required'],
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    state:{
        type:Boolean,
        default:true,
    }
});


UsersSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject();
    return user;
}


module.exports = model('User', UsersSchema);