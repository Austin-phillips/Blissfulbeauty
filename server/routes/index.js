const { Router } = require('express');
const services = require('./services');
const appointments = require('./appointments');
const images = require('./images');

const router = Router();

router.use('/services', services);
router.use('/appointments', appointments);
router.use('/images', images);

module.exports = router;