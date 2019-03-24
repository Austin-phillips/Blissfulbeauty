const { Router } = require('express');
const services = require('./services');
const appointments = require('./appointments');
const images = require('./images');

const router = Router();

router.use('/api/services', services);
router.use('/api/appointments', appointments);
router.use('/api/images', images);

module.exports = router;