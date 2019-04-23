const { Router } = require('express');
const pool = require('../db');
const checkJwt = require('../db/checkjwt');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config()

const upload = multer({dest: 'uploads/'})
const router = Router();

// Get all image URLs
router.get('/', (request, response, next) => {
  pool.query(
    'SELECT * FROM images',
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

// Post a new image to cloudinary
router.post('/', upload.array('image', 25), (request, response, next) => {
  const file = request.files
  const rows = []
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  file.forEach(f => {
    cloudinary.uploader.upload(f.path, { angle: "exif" }, function (error, result) { 
      pool.query(
        'INSERT INTO images(url) VALUES($1) RETURNING *',
        [result.secure_url],
        (err, res) => {
          if (err) return next(err);

          rows.push(res.rows[0])
          if (rows.length === file.length) {
            response.json(rows)
          }
          // response.json(res.rows[0]);
        }
      )
     });
  })

})

// Delete an image
router.delete('/:id', (request, response, next) => {
  const { id } = request.params;

  pool.query(
    'DELETE FROM images WHERE id = $1 RETURNING *',
    [id],
    (err, res) => {
      if (err) return next(err);

      const returnedId = res.rows[0].id
      response.json(returnedId);
    }
  );
});

module.exports = router;