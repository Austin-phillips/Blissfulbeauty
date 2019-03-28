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
  const { date, time, notes, service, first, last, email, length, uid, price } = request.body.appointment;
  console.log(request.body.appointment.length)
  pool.query(
    `INSERT INTO appointments(date, time, notes, service, first, last, email, length, uid, price) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8 ,$9, $10)
    RETURNING *`,
    [ date, time, notes, service, first, last, email, length, uid, price ],
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

// Edit appointments
router.put('/:id', (request, response, next) => {
  const { id } = request.params;
  const { date, time, notes, service, first, last, email, length, uid, price } = request.body;

  pool.query(
    `UPDATE appointments SET date=($1), time=($2), notes=($3), service=($4), first=($5), last=($6), email=($7),
     length=($8), uid=($9), price=($10) WHERE id=($11)`,
     [ date, time, notes, service, first, last, email, length, uid, price, id ],
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