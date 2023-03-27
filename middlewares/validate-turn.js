const Turn = require('../models/turn');
const moment = require('moment');

const verifyTurn = (req, res, next) => {
  const { date:datex } = req.body;

  // Verifica si el turno es para una fecha futura
  const dateTurn = moment(datex);

  const today = moment();

  if (dateTurn.isBefore(today, 'day')) {
    return res.status(400).json({ error: 'El turno es para una fecha pasada.' });
  }

  if( !dateTurn.isValid() ){
    return res.status(400).json({ error: 'Invalid date.' });
  }

  next();

};

module.exports = {
  verifyTurn
}