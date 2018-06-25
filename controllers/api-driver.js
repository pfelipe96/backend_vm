const ObjectID = require('mongodb').ObjectID,
      isEmpty  = require('is-empty');

// listar todas as corridas
module.exports.getAllList = (req, res) => {
    req.db.collection('driver').find().toArray((err, result) => {
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
module.exports.recorderDriver = (req, res) => {
  let data = req.body;

  // Verificação da tabela
  if(isEmpty(data.nameDriver && data.birthday && data.cpf && data.car  && data.gender)){
    return res.sendStatus(403);
  }else{
    req.db.collection('driver').save(data, (err, result) => {
      if (err) {
        return res.sendStatus(503);
      }
      res.sendStatus(200);
    });
  }
};
