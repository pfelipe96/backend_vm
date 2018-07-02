const ObjectID = require('mongodb').ObjectID,
  isEmpty = require('is-empty');

// listar todas os Passageiro
module.exports.getAllList = (req, res) => {
  req.db.collection('customer').find().toArray((err, result) => {
    if (err) {
      return res.sendStatus(503);
    }
    res.send(result);
  });
};

// registrar a Passageiro
module.exports.recorderCustomer = (req, res) => {
  let data = req.body;

  // Verificação da tabela
  if (isEmpty(data.nameCustomer && data.birthday && data.cpf && data.gender)) {
    return res.sendStatus(400);
  } else {
    req.db.collection('customer').findOne({cpf: data.cpf}, (err, result) => {
      if (err) {
        return res.sendStatus(503);
      } else if (isEmpty(result)) {
        saveCustomerDb(data, req, res)
      } else {
        res.send("Usuário já encontra-se cadastrado")
      }
    })
  }
};

saveCustomerDb = (data, req, res) => {
  req.db.collection('customer').save(data, (err, result) => {
    if (err) {
      return res.sendStatus(503);
    }
    res.sendStatus(200);
  });
};
