const ObjectID = require('mongodb').ObjectID,
      isEmpty  = require('is-empty');

// listar todas as corridas
module.exports.getAllList = (req, res) => {
    req.db.collection('running').find().toArray((err, result) => {
      if (err) {
        return res.sendStatus(503);
      }
      res.send(result);
    });
};

// registrar a corrida
module.exports.recorderRunning = (req, res) => {
  let data = req.body;

  // Verificação da tabela
  if(isEmpty(data.driver && data.customer && data.cash)){
    return res.sendStatus(400);
  }else{
    req.db.collection('corridas').save(data, (err, result) => {
      if (err) {
        return res.sendStatus(503);
      }
      res.sendStatus(200);
    });
  }
};

