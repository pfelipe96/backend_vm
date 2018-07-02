const ObjectID = require('mongodb').ObjectID,
      regex = require('mongodb').r
      isEmpty  = require('is-empty');

// listar todas as corridas
module.exports.getAllList = (req, res) => {
    req.db.collection('driver').find().toArray((err, result) => {
      if (err) {
        return res.sendStatus(503);
      }
      res.send(result);
    });
};

// registrar a corrida
module.exports.recorderDriver = (req, res) => {
  let data = req.body;

  // Verificação da tabela
  if(isEmpty(data.nameDriver && data.birthday && data.cpf && data.car  && data.gender)){
    return res.sendStatus(400);
  }else{
    req.db.collection('driver').findOne({cpf: data.cpf}, (err, result) => {
      if(err){
        return res.sendStatus(503);
      }else if(isEmpty(result)){
        saveDriver(data, req, res);
      }else{
        res.send("Passageiro já encontra-se cadastrado");
      }
    })
  }
};

saveDriver = (data, req, res) => {
  req.db.collection('driver').save(data, (err, result) => {
    if (err) {
      return res.sendStatus(503);
    }
    res.sendStatus(200);
  });
}


module.exports.searchDriver = (req, res) => {
  let data = req.body;

  if(isEmpty(data.nameDriver)){
    return res.sendStatus(400);
  }else{
    req.db.collection('driver').find({nameDriver: {$regex: data.nameDriver, $options:'i'}}).toArray((err, result) => {
      if (err) {
        return res.sendStatus(503);
      }
      res.send(result);
    });
  }
};

