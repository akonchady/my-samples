const express = require('express');
const app = express();

const MIN_VALUE = 0;
const MAX_VALUE = 5;
const GET_NUMBER_COUNT = 3;
const BONUS_PROBABILITY_COUNT = 10;
const BONUS_VALUE = 7;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Cache-Control', 'no-cache');
  next();
});

app.get('/', function(req, res, next) {
  const response = {
    outcomes: []
  };
  for(let i=0;i<GET_NUMBER_COUNT;i++) {
    response.outcomes.push(getRandomInteger(MIN_VALUE, MAX_VALUE))
  }
  const bonus = getRandomInteger(0, BONUS_PROBABILITY_COUNT);
  if (bonus === BONUS_VALUE) {
    response.bonus = true;
  }
  res.json(response);
});

app.listen(8082);

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
