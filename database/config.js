const mongoose = require('mongoose');


const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('MongoDB Online')
    } catch (error) {
        console.log(error)
        throw new Error('No se puede iniciar la DB')
    }
}


module.exports = {
    dbConnection
}