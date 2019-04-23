const { Router } = require('express');
const pool = require('../db');
const checkJwt = require('../db/checkjwt');

const router = Router();

// Get all appointments ordered by date and time
router.get('/', (request, response, next) => {
  pool.query(
    'SELECT * FROM appointments ORDER BY date ASC, time ASC',
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
    'SELECT * FROM appointments WHERE uid = $1 ORDER BY date ASC, time ASC',
    [ uid ],
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

// Create new appointment
router.post('/', (request, response, next) => {
  const { date, formattedTime, notes, service, first, last, email, length, uid, price, filteredNumber } = request.body.appointment;
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const client = require('twilio')(accountSid, authToken);

  pool.query(
    `INSERT INTO appointments(date, time, notes, service, first, last, email, length, uid, price, number) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8 ,$9, $10, $11)
    RETURNING *`,
    [date, formattedTime, notes, service, first, last, email, length, uid, price, filteredNumber ],
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );

  client.messages
    .create({
      body: `Thank you for booking. Your appointment is on ${date} at ${formattedTime}. To make any changes, please contact Jaiden at (801) 822-9174.`,
      from: '+13852478056',
      to: filteredNumber
    })
    .then(message => console.log(message.sid))
  client.messages
    .create({
      body: `${first} ${last} booked an appointment on ${date} at ${formattedTime}`,
      from: '+13852478056',
      to: '8018229174'
    })
    .then(message => console.log(message.sid))
});

// Edit appointments
router.put('/:id', (request, response, next) => {
  const { id } = request.params;
  const { date, time, notes, service, first, last, email, length, uid, price, number, status } = request.body.appointment;
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  
  if (status === 'Reschedule') {
    client.messages
      .create({
        body: `Your ${service} appointment has been rescheduled to ${date} at ${time}. to make changes, please contact Jaiden at (801) 822-9174.`,
        from: '+13852478056',
        to: number
      })
      .then(message => console.log(message.sid))
  }

  pool.query(
    `UPDATE appointments SET date=($1), time=($2), notes=($3), service=($4), first=($5), last=($6), email=($7),
     length=($8), uid=($9), price=($10), number=($11) WHERE id=($12) Returning *`,
    [date, time, notes, service, first, last, email, length, uid, price, number, id ],
     (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
     }
  );
});

// Delete appointment by id
router.delete('/:id/:status/:number', (request, response, next) => {
  const { id, status, number } = request.params;
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const client = require('twilio')(accountSid, authToken);

  if (status === 'Cancel') {
    client.messages
      .create({
        body: `Your appointment has been canceled. If this was a mistake, please contact Jaiden at (801) 822-9174.`,
        from: '+13852478056',
        to: number
      })
      .then(message => console.log(message.sid))
  }

  pool.query(
    'DELETE FROM appointments WHERE id = $1 RETURNING *',
    [ id ],
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

module.exports = router;