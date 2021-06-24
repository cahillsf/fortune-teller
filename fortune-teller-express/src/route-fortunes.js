const express = require('express');
const bodyParser = require('body-parser');
//const Rx = require('rxjs');
//const session = require('express-session')


function createRouter(db) {
    const router = express.Router();

    router.post('/getFortune', (req, res, next) => {
        console.log("called");
        db.query(
          'SELECT * FROM table_name ORDER BY RAND() LIMIT 1;',
          (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({status: 'error'});
            } else {
                // console.log(result[0].password);
                res.status(200).json(result[0]);
            }
          }
        );
    });
}