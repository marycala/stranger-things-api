const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router()
  .get('/random', (req, res, next) => {
    const { count = 1 } = req.query;
    Character
      .getRandom(+count)
      .then(character => res.send(character))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Character
      .findById(req.params.id)
      .select('-__v')
      .then(character => res.send(character))
      .catch(next);
  })

  .get('/characters', (req, res, next) => {
  const { page = 1, perPage = 20 } = req.query;

  if (!req.query.page && !req.query.perPage) {
    Character.find()
      .lean()
      .then(characters => res.send(characters))
      .catch(next);
  } else {
    Character
      .find()
      .skip((page - 1) * perPage)
      .limit(Number(perPage))
      .lean()
      .then(characters => res.send(characters))
      .catch(next);
  }
});

