var express = require('express');
var router = express.Router();
const sql = require('mssql'); // importo sql 

// collega db 
const config = {
  user: 'labarbera.luca',  //Vostro user name
  password: 'xxx123#', //Vostra password
  server: "213.140.22.237",  //Stringa di connessione
  database: 'labarbera.luca', //(Nome del DB)
}
/* GET users listing. */
router.get('/', function(req, res, next) {
let sqlQuery = "select * from dbo.[cr-unit-attributes]";  // query sql 
executeQuery(res, sqlQuery, next); // mette qua dentro la select e metto sql query al metodo execute...
});

// METODO EXECUTEQUERY 
let executeQuery = function (res, query, next) { sql.connect(config, function (err) {
if (err) {
console.log("Error while connecting database :- " + err); res.status(500).json({success: false, message:'Error while connecting database', error:err});
return;
}
var request = new sql.Request(); request.query(query, function (err, result) {
if (err) {
console.log("Error while querying database :- " + err); res.status(500).json({success: false, message:'Error while querying database', error:err});
sql.close();
return;
}
renderPug(res, result.recordset); return;
}); });
}
// RENDER PUG CONTIENE RISULTYATO (RECORDSET) 
function renderPug(res, recordset) { res.render('index', {
title: 'Tutte le unità:',
        re: recordset,
    });
}


module.exports = router;
