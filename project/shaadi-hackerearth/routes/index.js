var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    /*connection.query('SELECT * from notes', function(err, rows, fields) {
        if (err) throw err;

        res.send('The solution is: ', rows);
    });*/
    res.send({title: 'hello'})
});

module.exports = router;
