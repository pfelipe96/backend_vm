const ObjectID = require('mongodb').ObjectID,
      isEmpty  = require('is-empty');

// listar todas as corridas
module.exports.getAllList = (req, res) => {
    req.db.collection('running').find().toArray((err, result) => {
        if (err) {
          return console.log(err)
        };
        
        if(isEmpty(result) || result.lenght == 0){
          res.send(result)
        }else{
          res.send(result);
        }
    });
};

// registrar a corrida
module.exports.recorderRunning = (req, res) => {
  let dataRecorderRunning = req.body;

  // Verificação da tabela
  if(isEmpty(dataRecorderRunning.driver && dataRecorderRunning.customer && dataRecorderRunning.cash)){
    return res.sendStatus(403);
  }else{
    req.db.collection('corridas').save(dataRecorderRunning, (err, result) => {
      if (err) {
        return res.sendStatus(503);
      }
      res.sendStatus(200);
    });
  }
};

