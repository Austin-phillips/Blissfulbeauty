const { Router } = require('express');
const pool = require('../db');
const checkJwt = require('../db/checkjwt');

const router = Router();

router.get('/', (request, response, next) => {
  pool.query(
    'SELECT * FROM images',
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

module.exports = router;