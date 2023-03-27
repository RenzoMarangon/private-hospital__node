const { Schema, model } = require('mongoose');


const TurnSchema = Schema({
    date:{
        type: Date,
        required:true,
    },
    time:{
        type:String,
        required: true,
    },
    patient:{
        type: Schema.Types.ObjectId,
        ref:'Patient',
    },
    doctor:{
        type: Schema.Types.ObjectId,
        ref:'Doctor',
    }
})

TurnSchema.methods.toJSON = function(){
    const { __v, _id , ...turn } = this.toObject();
    turn.uid = _id;
    return turn;
}

module.exports = model('Turn', TurnSchema);