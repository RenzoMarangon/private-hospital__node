const moment = require('moment');

const Patient = require('../models/patient');
const Doctor = require('../models/doctor');

const verifyTurn = (req, res, next) => {
  const { date, time } = req.body;



  // Verifica si el turno es para una fecha futura
  const today = moment();

  if (moment(date).isBefore(today, 'day')) {
    return res.status(400).json({ error: 'El turno es para una fecha pasada.' });
  }

  //Verificar si la fecha es válida


  if( !moment(`${date}`, "YYYY-MM-DD").isValid()){
    return res.status(400).json({ error: 'Invalid date.' });
  }

  if(!moment(`${time}`, "hh:mm").isValid())
  {
    return res.status(400).json({ error: 'Invalid time.' });
  }


  next();
};




const patientHaveTurn = async( req, res, next ) => {

  let { date, time, patientID } = req.body

  time = time.substring(0, 5);

  const { turn:turnPatient } = await Patient.findById( patientID );

  //Reviso si tiene algun turno en esa fecha y hora, si es asi devuelvo un status 400
  let haveTurn = false;

  turnPatient.forEach( turn => {

    turn.date = moment(date).format('YYYY-MM-DD');

    if( date === turn.date && time === turn.time )
    {
      haveTurn = true
    }

  });

  if(haveTurn) 
  {
    return res.status(400).json(`Patient have a turn in this time and date`);
  } 

  next()
}



const doctorHaveTurn = async( req, res, next ) => {

  let { date, time, doctorID } = req.body


  time = time.substring(0, 5);

  const { turn:turnDoctor } = await Doctor.findById( doctorID );
  console.log(turnDoctor)


  //Reviso si tiene algun turno en esa fecha y hora, si es asi devuelvo un status 400
  let haveTurn = false;

  turnDoctor.forEach( turn => {

    turn.date = moment(date).format('YYYY-MM-DD');

    if( date === turn.date && time === turn.time )
    {
      haveTurn = true
    }

  });

  if(haveTurn) 
  {
    return res.status(400).json(`Doctor have a turn in this time and date`);
  } 

  next()
}

const turnHaveSpecialization = (req, res, next) => {

  const { specialization } = req.body;

  if( !!!specialization || specialization === "")
  {
    return res.status(400).json({error:"Turn doesn't have specialization"})
  }

  next()

}


module.exports = {
  verifyTurn,
  patientHaveTurn,
  turnHaveSpecialization,
  doctorHaveTurn
}