const models = require('./models');

module.exports.getAnswers = (req, res) => {
  models.getQuestions(req)
    .then(results => {
      res.status(200).send(JSON.stringify(results))
    })
    .catch(error => {
      res.send(404)
    })
}
module.exports.post = (req, res) => {
  models.postAnswers(req)
  .then(results => {
    res.status(201).send(JSON.stringify(results))
  })
  .catch(error => {
    res.send(404)
  })
}
module.exports.put = (req, res) => {
  models.putAnswers(req)
  .then(results => {
    res.status(201).send(JSON.stringify(results))
  })
  .catch(error => {
    res.send(404)
  })
}