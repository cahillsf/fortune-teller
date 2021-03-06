const tracer = require('dd-trace').init({ debug: true, logInjection: true });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const logger = require('./logger')

const connection = mysql.createConnection({
  host     : 'mysql_db',
  // host     : 'localhost',
  user     : 'ft_express_db_connect',
  password : 'tacosandburritos',
  database : 'fortune_teller'
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  //.use(events(connection))
  .use(bodyParser.urlencoded({ extended: true }));

app.get('/getFortune/:topic', async (req, res, next) => {
  // console.log("called");
  // console.log(req.params);
  let topic = req.params.topic;
  logger.info({'topic': topic});
  connection.query(
    'SELECT quote \
    FROM (\
      SELECT * FROM fortunes WHERE topic=(?)) topic_fortunes\
      WHERE message_id >= RAND() * \
      ( SELECT MAX(message_id) FROM fortunes)\
    ORDER BY message_id LIMIT 1;', [req.params.topic],
    (error, result) => {
      if (error) {
          logger.error(error)
          res.status(500).json({status: 'error'});
      } else {
          logger.info(result[0]);
          res.status(200).json(result[0]['quote']);
      }
    }
  );
});

app.get('/getError/:code', (req, res, next) => {
  console.error("in error");
  console.log(req.params.code);
  let code = req.params.code;
  if(code != 500){
    logger.info({status: 400, message: "Bad Request - Here's your 400 thanks"});
    res.status(400).json({status: 400, message: "Bad Request - Here's your 400 thanks"});
  }
  else{
    logger.error({status: 500, message: "Internal Server Error - Here's your 500 thanks"})
    res.status(500).json({status: 500, message: "Internal Server Error - Here's your 500 thanks"});
  }
});



app.get('/testing', (req, res, next) => {
  console.log("called");
  //console.log(req.body.topic);
  connection.query(
    'SELECT * FROM fortunes;', [req.body.topic],
    (error, result) => {
      if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
      } else {
          console.log(result);
          res.status(200).json(result[0]['quote']);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});