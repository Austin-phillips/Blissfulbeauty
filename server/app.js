const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

app.use('/', routes);

app.use((err, req, res, next) => {
  res.json(err);
});

module.exports = app;