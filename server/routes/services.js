const { Router } = require('express');
const pool = require('../db');
const checkJwt = require('../db/checkjwt');

const router = Router();

// Get all services
router.get('/', (request, response, next) => {
  pool.query(
    'SELECT * FROM services ORDER BY id ASC',
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

// Get service by id
router.get('/:id', (request, response, next) => {
  const { id } = request.params;

  pool.query(
    'SELECT * FROM services WHERE id = $1',
    [ id ],
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

// Create new service
router.post('/', checkJwt, (request, response, next) => {
  const { name, price, description, time } = request.body;

  pool.query(
    'INSERT INTO services(name, price, description, length) VALUES($1, $2, $3, $4)',
    [ name, price, description, time ],
    (err, res) => {
      if (err) return next(err);

      response.redirect('/services');
    }
  );
});

// Edit service
router.put('/:id', checkJwt, (request, response, next) => {
  const { id } = request.params;
  const { name, price, description, length } = request.body;

  pool.query(
    'UPDATE services SET name=($1), price=($2), description=($3), length=($4) WHERE id=($5)',
    [ name, price, description, time, id ],
    (err, res) => {
      if (err) return next(err);

      response.redirect('/services');
    }
  );
});

// Delete service
router.delete('/:id', checkJwt, (request, response, next) => {
  const { id } = request.params;

  pool.query(
    'DELETE FROM services WHERE id = $1',
    [ id ],
    (err, res) => {
      if (err) return next(err);

      response.redirect('/services');
    }
  );
});

module.exports = router;
