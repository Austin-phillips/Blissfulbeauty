const { Router } = require('express');
const pool = require('../db');
const checkJwt = require('../db/checkjwt');
const cloudinary = require('cloudinary').v2;

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

router.post('/', (request, response, next) => {
  const { path } = request.body.image[0]

  cloudinary.config({
    cloud_name: '239151136752426',
    api_key: '239151136752426',
    api_secret: 'o7DjizJPV5tm7KWt3hgX62QTJyA'
  });

  cloudinary.uploader.upload(path, function (error, result) { console.log(error) });

})

module.exports = router;