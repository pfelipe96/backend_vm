const express        = require('express'),
      bodyParser     = require('body-parser'),
      expressMongoDb = require('express-mongo-db'),
      http           = require('http');

const controllerRunning = require('./controllers/api-running');
const controllerDriver = require('./controllers/api-driver.js');
const controllerCustomer = require('./controllers/api-customer.js');




// inicializa o express
const app = express();
const server = http.createServer(app);

// inicializa o body parser
app.use(bodyParser.json());

// inicializa mongo e expoe para o express
app.use(expressMongoDb('mongodb://localhost:27017/dbRunning'));

// libera acesso à API de qualquer host/cliente
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// inicializa o servidor na porta especificada
server.listen(4000);
server.on('listening', () => {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});


// Endpoints:

app.post('/running', controllerRunning.recorderRunning);
app.get('/running', controllerRunning.getAllList);

app.get('/driver', controllerDriver.getAllList);
app.post('/driver', controllerDriver.recorderDriver);

app.get('/customer', controllerCustomer.getAllList);
app.post('/customer', controllerCustomer.recorderCustomer);


