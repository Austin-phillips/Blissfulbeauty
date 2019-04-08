const { Router } = require('express');
const pool = require('../db');
const checkJwt = require('../db/checkjwt');

const router = Router();

// Get all appointments ordered by date and time
router.get('/', (request, response, next) => {
  pool.query(
    'SELECT * FROM appointments ORDER BY date ASC, time DESC',
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

// Get all appointmets by user id
router.get('/:uid', (request, response, next) => {
  const { uid } = request.params;
  
  pool.query(
    'SELECT * FROM appointments WHERE uid = $1 ORDER BY date ASC, time DESC',
    [ uid ],
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

// Create new appointment
router.post('/', (request, response, next) => {
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  const { date, time, notes, service, first, last, email, length, uid, price, filteredNumber } = request.body.appointment;

  pool.query(
    `INSERT INTO appointments(date, time, notes, service, first, last, email, length, uid, price, number) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8 ,$9, $10, $11)
    RETURNING *`,
    [ date, time, notes, service, first, last, email, length, uid, price, filteredNumber ],
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
  client.messages
    .create({
      body: `Thank you for booking. Your ${service} is at ${time} on ${date}. To make changes, please contact Jaiden at (801) 822-9174.`,
      from: '+13852478056',
      to: filteredNumber
    })
    .then(message => console.log(message.sid))
  client.messages
    .create({
      body: `${first} ${last} booked an appointment. Details: service: ${service}, date: ${date} at ${time}`,
      from: '+13852478056',
      to: '8019799538'
    })
    .then(message => console.log(message.sid));
});

// Edit appointments
router.put('/:id', (request, response, next) => {
  const { id } = request.params;
  const { date, time, notes, service, first, last, email, length, uid, price, number } = request.body;

  pool.query(
    `UPDATE appointments SET date=($1), time=($2), notes=($3), service=($4), first=($5), last=($6), email=($7),
     length=($8), uid=($9), price=($10), number=($11) WHERE id=($12)`,
     [ date, time, notes, service, first, last, email, length, uid, price, number, id ],
     (err, res) => {
      if (err) return next(err);

      response.redirect('/appointments');
     }
  );
});

// Delete appointment by id
router.delete('/:id', (request, response, next) => {
  const { id } = request.params;

  pool.query(
    'DELETE FROM appointments WHERE id = $1',
    [ id ],
    (err, res) => {
      if (err) return next(err);

      response.redirect('/appointments');
    }
  );
});

module.exports = router;